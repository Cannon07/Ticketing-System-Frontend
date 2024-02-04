#![cfg_attr(not(feature = "std"), no_std, no_main)]

pub use self::tickets_NFT::TicketsNftRef;

#[ink::contract]
mod tickets_NFT {
    
    use ink::storage::Mapping;
    use ink::prelude::string::String;
    use ink::prelude::vec::Vec;

    use scale::{
        Decode,
        Encode,
    };

    pub type TokenId = u32;

    #[ink(storage)]
    #[derive(Default)]
    pub struct TicketsNft {
        tiers: Mapping<String, u32>,
        token_tier: Mapping<TokenId, String>, 
        booked_seats_count: Mapping<String, u32>,
        token_owner: Mapping<TokenId, AccountId>,
        owned_tokens_count: Mapping<AccountId, u32>,
    }

    #[derive(Encode, Decode, Debug, PartialEq, Eq, Copy, Clone)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        NotOwner,
        TokenExists,
        TokenNotFound,
        CannotInsert,
        CannotFetchValue,
        NotAllowed,
        NoSeatsAvailable,
    }

    pub type Result<T> = core::result::Result<T, Error>;

    //#[ink(event)]
    //pub struct Transfer {
    //    #[ink(topic)]
    //    from: Option<AccountId>,
    //    #[ink(topic)]
    //    to: Option<AccountId>,
    //    #[ink(topic)]
    //    id: TokenId,
    //}

    impl TicketsNft {
        #[ink(constructor)]
        pub fn new(tier_list: Vec<String>, seats_list: Vec<u32>) -> Self {
            let mut tiers = Mapping::default();
            let mut booked_seats_count = Mapping::default();
            for i in 0..tier_list.len() {
                tiers.insert(&tier_list[i], &seats_list[i]);
                booked_seats_count.insert(&tier_list[i], &0);
            }
            Self {
                tiers,
                token_tier: Mapping::default(),
                booked_seats_count,
                token_owner: Mapping::default(),
                owned_tokens_count: Mapping::default(),
            }
        }

        #[ink(message)]
        pub fn get_tiers(&self, tier: String) -> Option<u32> {
            self.tiers.get(tier)
        }
        
        #[ink(message)]
        pub fn get_booked_seats_by_tier(&self, tier: String) -> Option<u32> {
            self.booked_seats_count.get(tier)
        }

        #[ink(message)]
        pub fn get_token_tier(&self, id: TokenId) -> Result<String> {
            if !self.token_tier.contains(&id) {
                return Err(Error::TokenNotFound);
            }

            Ok(self.token_tier.get(id).unwrap())
        }

        #[ink(message)]
        pub fn balance_of(&self, owner: AccountId) -> u32 {
            self.balance_of_or_zero(&owner)
        }

        #[ink(message)]
        pub fn owner_of(&self, id: TokenId) -> Option<AccountId> {
            self.token_owner.get(id)
        }

        #[ink(message)]
        pub fn transfer(
            &mut self,
            destination: AccountId,
            id: TokenId,
        ) -> Result<()> {
            let caller = self.env().caller();
            self.transfer_token_from(&caller, &destination, id)?;
            Ok(())
        }

        #[ink(message)]
        pub fn mint(&mut self, tier: String, id: TokenId) -> Result<()> {
            let caller = self.env().caller();

            if self.booked_seats_count.get(&tier) == self.tiers.get(&tier) {
                return Err(Error::NoSeatsAvailable);
            }

            let updated_seats = self.booked_seats_count.get(&tier).map(|c| c + 1).unwrap();
            self.booked_seats_count.insert(&tier, &updated_seats);
            self.token_tier.insert(id, &tier);

            self.add_token_to(&caller, id)?;

            //self.env().emit_event(Transfer {
            //    from: Some(AccountId::from([0x0; 32])),
            //    to: Some(caller),
            //    id,
            //});
            Ok(())
        }

        #[ink(message)]
        pub fn burn(&mut self, id: TokenId) -> Result<()> {
            let caller = self.env().caller();
            let Self {
                token_owner,
                owned_tokens_count,
                booked_seats_count,
                token_tier,
                ..
            } = self;

            let owner = token_owner.get(id).ok_or(Error::TokenNotFound)?;
            if owner != caller {
                return Err(Error::NotOwner)
            };

            let ticket_tier = token_tier.get(&id).unwrap();  
            let booked_seats = booked_seats_count.get(&ticket_tier).map(|c| c - 1).unwrap();
            booked_seats_count.insert(ticket_tier, &booked_seats);
            token_tier.remove(id);

            let count = owned_tokens_count
                .get(caller)
                .map(|c| c - 1)
                .ok_or(Error::CannotFetchValue)?;
            owned_tokens_count.insert(caller, &count);
            token_owner.remove(id);

            //self.env().emit_event(Transfer {
            //    from: Some(caller),
            //    to: Some(AccountId::from([0x0; 32])),
            //    id,
            //});

            Ok(())
        }

        fn transfer_token_from(
            &mut self,
            from: &AccountId,
            to: &AccountId,
            id: TokenId,
        ) -> Result<()> {
            let owner = self.token_owner.get(id).ok_or(Error::TokenNotFound)?;
            if owner != *from {
                return Err(Error::NotOwner)
            };
            self.remove_token_from(from, id)?;
            self.add_token_to(to, id)?;
            //self.env().emit_event(Transfer {
            //    from: Some(*from),
            //    to: Some(*to),
            //    id,
            //});
            Ok(())
        }

        fn remove_token_from(
            &mut self,
            from: &AccountId,
            id: TokenId,
        ) -> Result<()> {
            let Self {
                token_owner,
                owned_tokens_count,
                ..
            } = self;

            if !token_owner.contains(id) {
                return Err(Error::TokenNotFound)
            }

            let count = owned_tokens_count
                .get(from)
                .map(|c| c - 1)
                .ok_or(Error::CannotFetchValue)?;
            owned_tokens_count.insert(from, &count);
            token_owner.remove(id);

            Ok(())
        }

        fn add_token_to(&mut self, to: &AccountId, id: TokenId) -> Result<()> {
            let Self {
                token_owner,
                owned_tokens_count,
                ..
            } = self;

            if token_owner.contains(id) {
                return Err(Error::TokenExists)
            }

            if *to == AccountId::from([0x0; 32]) {
                return Err(Error::NotAllowed)
            };

            let count = owned_tokens_count.get(to).map(|c| c + 1).unwrap_or(1);

            owned_tokens_count.insert(to, &count);
            token_owner.insert(id, to);

            Ok(())
        }

        fn balance_of_or_zero(&self, of: &AccountId) -> u32 {
            self.owned_tokens_count.get(of).unwrap_or(0)
        }
    }

    #[cfg(test)]
    mod tests {

        use super::*;

        #[ink::test]
        fn constructor_works() {
            let tier_list = vec!["tier1".to_string(), "tier2".to_string()];
            let seats_list = vec![10, 20];
            
            let contract = TicketsNft::new(tier_list, seats_list);
            assert_eq!(contract.get_tiers("tier1".to_string()).unwrap(), 10);
            assert_eq!(contract.get_booked_seats_by_tier("tier1".to_string()).unwrap(), 0);
        }

        #[ink::test]
        fn mint_works() {
            let tier_list = vec!["tier1".to_string(), "tier2".to_string()];
            let seats_list = vec![10, 20];
            let accounts =
                ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();
            let mut tickets_NFT = TicketsNft::new(tier_list, seats_list);
            assert_eq!(tickets_NFT.owner_of(1), None);
            assert_eq!(tickets_NFT.balance_of(accounts.alice), 0);
            assert_eq!(tickets_NFT.mint("tier1".to_string(), 1), Ok(()));
            assert_eq!(tickets_NFT.balance_of(accounts.alice), 1);
            assert_eq!(tickets_NFT.get_booked_seats_by_tier("tier1".to_string()).unwrap(), 1);
            assert_eq!(tickets_NFT.get_token_tier(1).unwrap(), "tier1");
        }

        #[ink::test]
        fn mint_existing_should_fail() {
            let tier_list = vec!["tier1".to_string(), "tier2".to_string()];
            let seats_list = vec![10, 20];
            let accounts =
                ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();
            let mut erc721 = TicketsNft::new(tier_list, seats_list);
            assert_eq!(erc721.mint("tier1".to_string(), 1), Ok(()));
            //assert_eq!(1, ink::env::test::recorded_events().count());
            assert_eq!(erc721.balance_of(accounts.alice), 1);
            assert_eq!(erc721.owner_of(1), Some(accounts.alice));
            assert_eq!(erc721.mint("tier1".to_string(), 1), Err(Error::TokenExists));
        }

        #[ink::test]
        fn mint_no_available_seats_should_fail() {
            let tier_list = vec!["tier1".to_string(), "tier2".to_string()];
            let seats_list = vec![1, 2];
            let accounts =
                ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();
            let mut erc721 = TicketsNft::new(tier_list, seats_list);
            assert_eq!(erc721.mint("tier1".to_string(), 1), Ok(()));
            //assert_eq!(1, ink::env::test::recorded_events().count());
            assert_eq!(erc721.balance_of(accounts.alice), 1);
            assert_eq!(erc721.owner_of(1), Some(accounts.alice));
            assert_eq!(erc721.mint("tier1".to_string(), 2), Err(Error::NoSeatsAvailable));
        }

        #[ink::test]
        fn transfer_works() {
            let tier_list = vec!["tier1".to_string(), "tier2".to_string()];
            let seats_list = vec![10, 20];
            let accounts =
                ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();
            let mut erc721 = TicketsNft::new(tier_list, seats_list);
            assert_eq!(erc721.mint("tier1".to_string(), 1), Ok(()));
            assert_eq!(erc721.balance_of(accounts.alice), 1);
            assert_eq!(erc721.balance_of(accounts.bob), 0);
            //assert_eq!(1, ink::env::test::recorded_events().count());
            assert_eq!(erc721.transfer(accounts.bob, 1), Ok(()));
            //assert_eq!(2, ink::env::test::recorded_events().count());
            assert_eq!(erc721.balance_of(accounts.bob), 1);
        }

        #[ink::test]
        fn invalid_transfer_should_fail() {
            let tier_list = vec!["tier1".to_string(), "tier2".to_string()];
            let seats_list = vec![10, 20];
            let accounts =
                ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();
            let mut erc721 = TicketsNft::new(tier_list, seats_list);
            assert_eq!(erc721.transfer(accounts.bob, 2), Err(Error::TokenNotFound));
            assert_eq!(erc721.owner_of(2), None);
            assert_eq!(erc721.mint("tier1".to_string(), 2), Ok(()));
            assert_eq!(erc721.balance_of(accounts.alice), 1);
            assert_eq!(erc721.owner_of(2), Some(accounts.alice));
            set_caller(accounts.bob);
            assert_eq!(erc721.transfer(accounts.eve, 2), Err(Error::NotOwner))
        }

        #[ink::test]
        fn burn_works() {
            let tier_list = vec!["tier1".to_string(), "tier2".to_string()];
            let seats_list = vec![10, 20];
            let accounts =
                ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();
            let mut erc721 = TicketsNft::new(tier_list, seats_list);
            assert_eq!(erc721.mint("tier1".to_string(), 1), Ok(()));
            assert_eq!(erc721.balance_of(accounts.alice), 1);
            assert_eq!(erc721.owner_of(1), Some(accounts.alice));
            assert_eq!(erc721.get_token_tier(1).unwrap(), "tier1".to_string());
            assert_eq!(erc721.get_booked_seats_by_tier("tier1".to_string()).unwrap(), 1);
            assert_eq!(erc721.burn(1), Ok(()));
            assert_eq!(erc721.balance_of(accounts.alice), 0);
            assert_eq!(erc721.owner_of(1), None);
            assert_eq!(erc721.get_token_tier(1), Err(Error::TokenNotFound));
            assert_eq!(erc721.get_booked_seats_by_tier("tier1".to_string()).unwrap(), 0);
        }

        #[ink::test]
        fn burn_fails_token_not_found() {
            let tier_list = vec!["tier1".to_string(), "tier2".to_string()];
            let seats_list = vec![10, 20];
            let mut erc721 = TicketsNft::new(tier_list, seats_list);
            assert_eq!(erc721.burn(1), Err(Error::TokenNotFound));
        }

        #[ink::test]
        fn burn_fails_not_owner() {
            let tier_list = vec!["tier1".to_string(), "tier2".to_string()];
            let seats_list = vec![10, 20];
            let accounts =
                ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();
            let mut erc721 = TicketsNft::new(tier_list, seats_list);
            assert_eq!(erc721.mint("tier1".to_string(), 1), Ok(()));
            set_caller(accounts.eve);
            assert_eq!(erc721.burn(1), Err(Error::NotOwner));
        }

        fn set_caller(sender: AccountId) {
            ink::env::test::set_caller::<ink::env::DefaultEnvironment>(sender);
        }
    }
}
