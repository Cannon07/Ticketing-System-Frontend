#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod concert_ticketing_system {

    use tickets_NFT::TicketsNftRef;
    use tickets_NFT::Error as TicketsError;
    use ink::storage::Mapping;
    use ink::prelude::string::String;
    use ink::prelude::vec::Vec;

    #[ink(storage)]
    pub struct ConcertTicketingSystem {
        users: Mapping<AccountId, String>, 
        organizers: Mapping<AccountId, String>,
        events: Mapping<AccountId, Vec<String>>, 
        tickets: Mapping<String, TicketsNftRef>,
        version: u32,
    }

    #[ink(event)]
    pub struct AccountModified {
        #[ink(topic)]
        account: Option<AccountId>,
        data: String,
    } 

    #[ink(event)]
    pub struct EventModified {
        #[ink(topic)]
        account: Option<AccountId>,
        data: Vec<String>,
    }

    #[ink(event)]
    pub struct Transfer {
        #[ink(topic)]
        from: Option<AccountId>,
        #[ink(topic)]
        to: Option<AccountId>,
        #[ink(topic)]
        id: u32,
    }

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        AlreadyRegisteredAsUser,
        NotRegisteredAsUser,
        AlreadyRegisteredAsOrganizer,
        NotRegisteredAsOrganizer,
        NoSuchEventRegistered,
        NoEventsRegistered,
        InvalidTier,
        InvalidToken,
        TokenExists,
        NotOwner,
        NoSeatsAvailable,
        NotAllowed,
        CannotFetchValue,
        SomethingWentWrong,
    }

    pub type Result<T> = core::result::Result<T, Error>;

    impl ConcertTicketingSystem {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self { 
                users: Mapping::default(), 
                organizers: Mapping::default(),
                events: Mapping::default(),
                tickets: Mapping::default(),
                version: 0,
            }
        }

        #[ink(message)]
        pub fn register_user(&mut self, data_hash: String) -> Result<()> {
            let caller = self.env().caller();

            if self.users.contains(caller) {
                return Err(Error::AlreadyRegisteredAsUser)
            }
            if self.organizers.contains(caller) {
                return Err(Error::AlreadyRegisteredAsOrganizer)
            }

            self.users.insert(caller, &data_hash); 
            
            Self::env().emit_event(AccountModified {
                account: Some(caller),
                data: data_hash,
            });
            
            Ok(())
        }

        #[ink(message)]
        pub fn update_user(&mut self, data_hash: String) -> Result<()> {
            let caller = self.env().caller();

            if !self.users.contains(caller) {
                return Err(Error::NotRegisteredAsUser)
            } 

            self.users.insert(caller, &data_hash); 
            
            Self::env().emit_event(AccountModified {
                account: Some(caller),
                data: data_hash,
            });
            
            Ok(())
        }
        
        #[ink(message)]
        pub fn get_user(&self) -> Option<String> {
            let caller = self.env().caller();
            self.users.get(caller)
        }

        #[ink(message)]
        pub fn register_organizer(&mut self, data_hash: String) -> Result<()> {
            let caller = self.env().caller();

            if self.organizers.contains(caller) {
                return Err(Error::AlreadyRegisteredAsOrganizer);
            }
            if self.users.contains(caller) {
                return Err(Error::AlreadyRegisteredAsUser)
            }        

            self.organizers.insert(caller, &data_hash); 

            Self::env().emit_event(AccountModified {
                account: Some(caller),
                data: data_hash,
            });

            Ok(())
        }

        #[ink(message)]
        pub fn update_organizer(&mut self, data_hash: String) -> Result<()> {
            let caller = self.env().caller();

            if !self.organizers.contains(caller) {
                return Err(Error::NotRegisteredAsOrganizer)
            } 

            self.organizers.insert(caller, &data_hash); 
            
            Self::env().emit_event(AccountModified {
                account: Some(caller),
                data: data_hash,
            });
            
            Ok(())
        }
        
        #[ink(message)]
        pub fn get_organizer(&self) -> Option<String> {
            let caller = self.env().caller();
            self.organizers.get(caller)
        }

        #[ink(message)]
        pub fn register_event(
            &mut self, 
            data_hash: String, 
            tickets_code_hash: Hash,
            tier_list: Vec<String>, 
            seats_list: Vec<u32>
        ) -> Result<()> {
            let caller = self.env().caller();
            
            if !self.organizers.contains(caller) {
                return Err(Error::NotRegisteredAsOrganizer);
            }
            
            let mut event_vec;

            if self.events.contains(caller) {
                event_vec = self.events.get(caller).unwrap();   
                event_vec.push(data_hash.clone());
                self.events.insert(caller, &event_vec);
            } else {
                event_vec = Vec::new();
                event_vec.push(data_hash.clone());
                self.events.insert(caller, &event_vec);
            }

            let total_balance = Self::env().balance();
            let salt = self.version.to_le_bytes();
            let tickets_contract = TicketsNftRef::new(tier_list, seats_list)
                                    .endowment(total_balance / 4)
                                    .code_hash(tickets_code_hash)
                                    .salt_bytes(salt)
                                    .instantiate();

            self.version += 1;
            
            self.tickets.insert(data_hash.clone(), &tickets_contract);

            Self::env().emit_event(EventModified {
                account: Some(caller),
                data: event_vec,
            });
            
            Ok(())
        }

        #[ink(message)]
        pub fn get_events(&self) -> Result<Vec<String>> {
            let caller = self.env().caller(); 
            if !self.organizers.contains(caller) {
                return Err(Error::NotRegisteredAsOrganizer);
            }

            if !self.events.contains(caller) {
                return Err(Error::NoEventsRegistered);
            }

            Ok(self.events.get(caller).unwrap())
        }

        #[ink(message)]
        pub fn update_events(&mut self, old_event: String, new_event: String) -> Result<()> { 
            let caller = self.env().caller();

            if !self.organizers.contains(caller) {
                return Err(Error::NotRegisteredAsOrganizer);
            }
            
            let mut event_vec = self.events.get(caller).unwrap();
            match event_vec.binary_search(&old_event) {
                Ok(e) => {
                    event_vec.remove(e);
                    event_vec.push(new_event.clone());
                    self.events.insert(caller, &event_vec);

                    let event_tickets = self.tickets.get(old_event.clone()).unwrap();
                    self.tickets.insert(new_event, &event_tickets);
                    self.tickets.remove(old_event);

                    Self::env().emit_event(EventModified {
                        account: Some(caller),
                        data: event_vec,
                    });

                    return Ok(());
                },
                Err(_) => return Err(Error::NoSuchEventRegistered)
            }
        }

        #[ink(message)]
        pub fn get_tiers(&self, event_hash: String, tier: String) -> Result<u32> {
            if !self.tickets.contains(event_hash.clone()) {
                return Err(Error::NoSuchEventRegistered);
            }
            let event_tickets = self.tickets.get(event_hash.clone()).unwrap();
            match event_tickets.get_tiers(tier) {
                Some(seat_count) => return Ok(seat_count),
                None => return Err(Error::InvalidTier),
            };
        }

        #[ink(message)]
        pub fn get_booked_seats_by_tier(&self, event_hash: String, tier: String) -> Result<u32> {
            if !self.tickets.contains(event_hash.clone()) {
                return Err(Error::NoSuchEventRegistered);
            }
            let event_tickets = self.tickets.get(event_hash.clone()).unwrap();
            match event_tickets.get_booked_seats_by_tier(tier) {
                Some(seat_count) => return Ok(seat_count),
                None => return Err(Error::InvalidTier),
            }
        }

        #[ink(message)]
        pub fn get_token_tier(&self, event_hash: String, id: u32) -> Result<String> {
            if !self.tickets.contains(event_hash.clone()) {
                return Err(Error::NoSuchEventRegistered);
            }
            let event_tickets = self.tickets.get(event_hash.clone()).unwrap();
            match event_tickets.get_token_tier(id) {
                Ok(tier) => return Ok(tier),
                Err(_) => return Err(Error::InvalidToken),
            }
        }

        #[ink(message)]
        pub fn balanace_of(&self, event_hash: String, owner: AccountId) -> Result<u32> {
            if !self.tickets.contains(event_hash.clone()) {
                return Err(Error::NoSuchEventRegistered);
            }
            if !self.users.contains(owner) {
                return Err(Error::NotRegisteredAsUser);
            }
            let event_tickets = self.tickets.get(event_hash.clone()).unwrap();
            Ok(event_tickets.balance_of(owner))
        }

        #[ink(message)]
        pub fn owner_of(&self, event_hash: String, id: u32) -> Result<AccountId> {
            if !self.tickets.contains(event_hash.clone()) {
                return Err(Error::NoSuchEventRegistered);
            }
            let event_tickets = self.tickets.get(event_hash.clone()).unwrap();
            match event_tickets.owner_of(id) {
                Some(user) => return Ok(user),
                None => return Err(Error::InvalidToken),
            }
        }

        #[ink(message)]
        pub fn mint(&mut self, event_hash: String, tier: String) -> Result<()> {
            let caller = self.env().caller();
            if !self.users.contains(caller) {
                return Err(Error::NotRegisteredAsUser);
            }

            if !self.tickets.contains(event_hash.clone()) {
                return Err(Error::NoSuchEventRegistered);
            }

            let mut event_tickets = self.tickets.get(event_hash.clone()).unwrap();
            match event_tickets.mint(caller, tier) {
                Ok(id) => {
                    self.env().emit_event(Transfer {
                        from: Some(AccountId::from([0x0; 32])),
                        to: Some(caller),
                        id,
                    });

                    return Ok(())
                },
                Err(TicketsError::InvalidTier) => return Err(Error::InvalidTier),
                Err(TicketsError::NoSeatsAvailable) => return Err(Error::NoSeatsAvailable),
                Err(TicketsError::TokenExists) => return Err(Error::TokenExists),
                Err(TicketsError::NotAllowed) => return Err(Error::NotAllowed),
                Err(_) => return Err(Error::SomethingWentWrong),
            }
        }

        #[ink(message)]
        pub fn burn(&mut self, event_hash: String, id: u32) -> Result<()> {
            let caller = self.env().caller();
            if !self.users.contains(caller) {
                return Err(Error::NotRegisteredAsUser);
            }

            if !self.tickets.contains(event_hash.clone()) {
                return Err(Error::NoSuchEventRegistered);
            }

            let mut event_tickets = self.tickets.get(event_hash.clone()).unwrap();
            match event_tickets.burn(caller, id) {
                Ok(()) => {
                    self.env().emit_event(Transfer {
                        from: Some(caller),
                        to: Some(AccountId::from([0x0; 32])),
                        id,
                    });

                    return Ok(())
                },
                Err(TicketsError::TokenNotFound) => return Err(Error::InvalidToken),
                Err(TicketsError::NotOwner) => return Err(Error::NotOwner),
                Err(TicketsError::CannotFetchValue) => return Err(Error::CannotFetchValue),
                Err(_) => return Err(Error::SomethingWentWrong),
            }
        }

        #[ink(message)]
        pub fn transfer(&mut self, event_hash: String, destination: AccountId, id: u32) -> Result<()> {
            let caller = self.env().caller();
            if !self.users.contains(caller) {
                return Err(Error::NotRegisteredAsUser);
            }
            
            if !self.users.contains(destination) {
                return Err(Error::NotRegisteredAsUser);
            }

            if !self.tickets.contains(event_hash.clone()) {
                return Err(Error::NoSuchEventRegistered);
            }

            let mut event_tickets = self.tickets.get(event_hash.clone()).unwrap();
            match event_tickets.transfer(caller, destination, id) {
                Ok(()) => {
                    self.env().emit_event(Transfer {
                        from: Some(caller),
                        to: Some(destination),
                        id,
                    });

                    return Ok(())
                },
                Err(TicketsError::TokenNotFound) => return Err(Error::InvalidToken),
                Err(TicketsError::NotOwner) => return Err(Error::NotOwner),
                Err(TicketsError::CannotFetchValue) => return Err(Error::CannotFetchValue),
                Err(TicketsError::NotAllowed) => return Err(Error::NotAllowed),
                Err(TicketsError::TokenExists) => return Err(Error::TokenExists),
                Err(_) => return Err(Error::SomethingWentWrong),
            }
        }
    }
    
    #[cfg(test)]
    mod tests {
        use super::*;

        type Event = <ConcertTicketingSystem as ::ink::reflect::ContractEventBase>::Type;

        fn assert_account_event(event: &ink::env::test::EmittedEvent, expected_from: Option<AccountId>, expected_data: String) {
            let decoded_event = <Event as scale::Decode>::decode(&mut &event.data[..])
                .expect("encountered invalid contract event data buffer");
            if let Event::AccountModified(AccountModified { account, data }) = decoded_event {
                assert_eq!(account, expected_from, "encountered invalid AccountModified.user");
                assert_eq!(data, expected_data, "encountered invalid AccountModified.data");
            } else {
                panic!("encountered unexpected event kind: expected a AccountModified event")
            }
        }

        fn assert_events_event(event: &ink::env::test::EmittedEvent, expected_from: Option<AccountId>, expected_data: Vec<String>) {
            let decoded_event = <Event as scale::Decode>::decode(&mut &event.data[..])
                .expect("encountered invalid contract event data buffer");
            if let Event::EventModified(EventModified { account, data }) = decoded_event {
                assert_eq!(account, expected_from, "encountered invalid EventModified.user");
                assert_eq!(data, expected_data, "encountered invalid EventModified.data");
            } else {
                panic!("encountered unexpected event kind: expected a EventModified event")
            }
        }

        #[ink::test]
        fn register_user_works() {
            let mut contract = ConcertTicketingSystem::new(); 

            assert_eq!(contract.register_user("Gekki".to_string()), Ok(()));
            assert_eq!(contract.get_user().unwrap(), "Gekki".to_string());
            
            let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
            assert_eq!(1, emitted_events.len());
            assert_account_event(
                &emitted_events[0],
                Some(AccountId::from([0x01; 32])),
                "Gekki".to_string(),
            );
        } 

        #[ink::test]
        fn register_user_fails() {
            let mut contract = ConcertTicketingSystem::new(); 

            assert_eq!(contract.register_organizer("Gekki".to_string()), Ok(()));
            assert_eq!(contract.get_organizer().unwrap(), "Gekki".to_string());

            let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
            assert_eq!(1, emitted_events.len());
            assert_account_event(
                &emitted_events[0],
                Some(AccountId::from([0x01; 32])),
                "Gekki".to_string(),
            );

            assert_eq!(contract.register_organizer("Hello".to_string()), Err(Error::AlreadyRegisteredAsOrganizer));
            assert_eq!(contract.register_user("Hello".to_string()), Err(Error::AlreadyRegisteredAsOrganizer)); 
        } 

        #[ink::test]
        fn update_user_works() {
            let mut contract = ConcertTicketingSystem::new(); 

            assert_eq!(contract.register_user("Gekki".to_string()), Ok(()));
            assert_eq!(contract.get_user().unwrap(), "Gekki".to_string());
            
            let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
            assert_eq!(1, emitted_events.len());
            assert_account_event(
                &emitted_events[0],
                Some(AccountId::from([0x01; 32])),
                "Gekki".to_string(),
            );

            assert_eq!(contract.update_user("Hello".to_string()), Ok(()));
            assert_eq!(contract.get_user().unwrap(), "Hello".to_string());
            
            let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
            assert_eq!(2, emitted_events.len());
            assert_account_event(
                &emitted_events[1],
                Some(AccountId::from([0x01; 32])),
                "Hello".to_string(),
            );
        }

        #[ink::test]
        fn update_user_fails() {
            let mut contract = ConcertTicketingSystem::new(); 

            assert_eq!(contract.update_user("Hello".to_string()), Err(Error::NotRegisteredAsUser));

            assert_eq!(contract.register_organizer("Gekki".to_string()), Ok(()));
            assert_eq!(contract.get_organizer().unwrap(), "Gekki".to_string());
            
            let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
            assert_eq!(1, emitted_events.len());
            assert_account_event(
                &emitted_events[0],
                Some(AccountId::from([0x01; 32])),
                "Gekki".to_string(),
            );

            assert_eq!(contract.update_user("Hello".to_string()), Err(Error::NotRegisteredAsUser));
        }

        #[ink::test]
        fn register_organizer_works() {
            let mut contract = ConcertTicketingSystem::new(); 

            assert_eq!(contract.register_organizer("Gekki".to_string()), Ok(()));
            assert_eq!(contract.get_organizer().unwrap(), "Gekki".to_string());
            
            let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
            assert_eq!(1, emitted_events.len());
            assert_account_event(
                &emitted_events[0],
                Some(AccountId::from([0x01; 32])),
                "Gekki".to_string(),
            );
        }

        #[ink::test]
        fn register_organizer_fails() {
            let mut contract = ConcertTicketingSystem::new(); 

            assert_eq!(contract.register_user("Gekki".to_string()), Ok(()));
            assert_eq!(contract.get_user().unwrap(), "Gekki".to_string());
            
            let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
            assert_eq!(1, emitted_events.len());
            assert_account_event(
                &emitted_events[0],
                Some(AccountId::from([0x01; 32])),
                "Gekki".to_string(),
            );
            
            assert_eq!(contract.register_user("Hello".to_string()), Err(Error::AlreadyRegisteredAsUser));
            assert_eq!(contract.register_organizer("Hello".to_string()), Err(Error::AlreadyRegisteredAsUser));
        }

        #[ink::test]
        fn update_organizer_works() {
            let mut contract = ConcertTicketingSystem::new(); 

            assert_eq!(contract.register_organizer("Gekki".to_string()), Ok(()));
            assert_eq!(contract.get_organizer().unwrap(), "Gekki".to_string());
            
            let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
            assert_eq!(1, emitted_events.len());
            assert_account_event(
                &emitted_events[0],
                Some(AccountId::from([0x01; 32])),
                "Gekki".to_string(),
            );

            assert_eq!(contract.update_organizer("Hello".to_string()), Ok(()));
            assert_eq!(contract.get_organizer().unwrap(), "Hello".to_string());
            
            let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
            assert_eq!(2, emitted_events.len());
            assert_account_event(
                &emitted_events[1],
                Some(AccountId::from([0x01; 32])),
                "Hello".to_string(),
            );
        }

        #[ink::test]
        fn update_organizer_fails() {
            let mut contract = ConcertTicketingSystem::new(); 

            assert_eq!(contract.update_organizer("Hello".to_string()), Err(Error::NotRegisteredAsOrganizer));

            assert_eq!(contract.register_user("Gekki".to_string()), Ok(()));
            assert_eq!(contract.get_user().unwrap(), "Gekki".to_string());
            
            let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
            assert_eq!(1, emitted_events.len());
            assert_account_event(
                &emitted_events[0],
                Some(AccountId::from([0x01; 32])),
                "Gekki".to_string(),
            );

            assert_eq!(contract.update_organizer("Hello".to_string()), Err(Error::NotRegisteredAsOrganizer));
        }

        //#[ink::test]
        //fn register_event_works() {
        //    let mut contract = ConcertTicketingSystem::new();
        //    
        //    assert_eq!(contract.register_organizer("Gekki".to_string()), Ok(()));
        //    assert_eq!(contract.get_organizer().unwrap(), "Gekki".to_string());

        //    let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
        //    assert_eq!(1, emitted_events.len());
        //    assert_account_event(
        //        &emitted_events[0],
        //        Some(AccountId::from([0x01; 32])),
        //        "Gekki".to_string(),
        //    );

        //    let tiers_1 = vec!["tier1".to_string(), "tier2".to_string()];
        //    let seats_1 = vec![3, 4];
        //    let tickets_code_hash: Hash = Hash::from_str("0xb45d139582b560745b18ebe220d188fb5d24427e7e35ff2b5623bc7733c687c9");
        //    assert_eq!(contract.register_event("Hello".to_string(), tickets_code_hash, 10, tiers_1, seats_1), Ok(()));
        //    assert_eq!(contract.get_events().unwrap(), vec!["Hello"]);
        //    
        //    let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
        //    assert_eq!(2, emitted_events.len());
        //    assert_events_event(
        //        &emitted_events[1],
        //        Some(AccountId::from([0x01; 32])),
        //        vec!["Hello".to_string()],
        //    );

        //    let tiers_2 = vec!["tier3".to_string(), "tier4".to_string()];
        //    let seats_2 = vec![5, 6];
        //    assert_eq!(contract.register_event("Gekki".to_string(), tickets_code_hash, 11, tiers_2, seats_2), Ok(()));
        //    assert_eq!(contract.get_events().unwrap(), vec!["Hello", "Gekki"]);

        //    let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
        //    assert_eq!(3, emitted_events.len());
        //    assert_events_event(
        //        &emitted_events[2],
        //        Some(AccountId::from([0x01; 32])),
        //        vec!["Hello".to_string(), "Gekki".to_string()],
        //    );
        //}

        //#[ink::test]
        //fn register_event_fails() {
        //    let mut contract = ConcertTicketingSystem::new();

        //    assert_eq!(contract.register_user("Gekki".to_string()), Ok(()));
        //    assert_eq!(contract.get_user().unwrap(), "Gekki".to_string());

        //    let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
        //    assert_eq!(1, emitted_events.len());
        //    assert_account_event(
        //        &emitted_events[0],
        //        Some(AccountId::from([0x01; 32])),
        //        "Gekki".to_string(),
        //    );

        //    assert_eq!(contract.register_event("Gekki".to_string()), Err(Error::NotRegisteredAsOrganizer));
        //}

        //#[ink::test]
        //fn update_event_works() {
        //    let mut contract = ConcertTicketingSystem::new();

        //    assert_eq!(contract.register_organizer("Gekki".to_string()), Ok(()));
        //    assert_eq!(contract.get_organizer().unwrap(), "Gekki".to_string());

        //    let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
        //    assert_eq!(1, emitted_events.len());
        //    assert_account_event(
        //        &emitted_events[0],
        //        Some(AccountId::from([0x01; 32])),
        //        "Gekki".to_string(),
        //    );

        //    assert_eq!(contract.register_event("Hello".to_string()), Ok(()));
        //    assert_eq!(contract.get_events().unwrap(), vec!["Hello"]);
        //    
        //    let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
        //    assert_eq!(2, emitted_events.len());
        //    assert_events_event(
        //        &emitted_events[1],
        //        Some(AccountId::from([0x01; 32])),
        //        vec!["Hello".to_string()],
        //    );

        //    assert_eq!(contract.register_event("Hello1".to_string()), Ok(()));
        //    assert_eq!(contract.get_events().unwrap(), vec!["Hello", "Hello1"]);
        //    
        //    let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
        //    assert_eq!(3, emitted_events.len());
        //    assert_events_event(
        //        &emitted_events[2],
        //        Some(AccountId::from([0x01; 32])),
        //        vec!["Hello".to_string(), "Hello1".to_string()],
        //    );

        //    assert_eq!(contract.update_events("Hello".to_string(), "Bye".to_string()), Ok(()));
        //    assert_eq!(contract.get_events().unwrap(), vec!["Hello1", "Bye"]);
        //    
        //    let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
        //    assert_eq!(4, emitted_events.len());
        //    assert_events_event(
        //        &emitted_events[3],
        //        Some(AccountId::from([0x01; 32])),
        //        vec!["Hello1".to_string(), "Bye".to_string()],
        //    );
        //}

        //#[ink::test]
        //fn update_event_fails_when_user_registers_event() {
        //    let mut contract = ConcertTicketingSystem::new();

        //    assert_eq!(contract.register_user("Gekki".to_string()), Ok(()));
        //    assert_eq!(contract.get_user().unwrap(), "Gekki".to_string());

        //    let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
        //    assert_eq!(1, emitted_events.len());
        //    assert_account_event(
        //        &emitted_events[0],
        //        Some(AccountId::from([0x01; 32])),
        //        "Gekki".to_string(),
        //    );

        //    assert_eq!(contract.register_event("Hello".to_string()), Err(Error::NotRegisteredAsOrganizer));
        //}

        //#[ink::test]
        //fn update_event_fails_when_old_event_does_not_exsist() {
        //    let mut contract = ConcertTicketingSystem::new();

        //    assert_eq!(contract.register_organizer("Gekki".to_string()), Ok(()));
        //    assert_eq!(contract.get_organizer().unwrap(), "Gekki".to_string());

        //    let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
        //    assert_eq!(1, emitted_events.len());
        //    assert_account_event(
        //        &emitted_events[0],
        //        Some(AccountId::from([0x01; 32])),
        //        "Gekki".to_string(),
        //    );

        //    assert_eq!(contract.register_event("Hello".to_string()), Ok(()));
        //    assert_eq!(contract.get_events().unwrap(), vec!["Hello"]);
        //    
        //    let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
        //    assert_eq!(2, emitted_events.len());
        //    assert_events_event(
        //        &emitted_events[1],
        //        Some(AccountId::from([0x01; 32])),
        //        vec!["Hello".to_string()],
        //    );

        //    assert_eq!(contract.update_events("Hello1".to_string(), "Bye".to_string()), Err(Error::NoSuchEventRegistered));
        //}

        //#[ink::test]
        //fn get_event_fails_when_not_registerd_as_organizer() {
        //    let mut contract = ConcertTicketingSystem::new();

        //    assert_eq!(contract.register_user("Gekki".to_string()), Ok(()));
        //    assert_eq!(contract.get_user().unwrap(), "Gekki".to_string());

        //    let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
        //    assert_eq!(1, emitted_events.len());
        //    assert_account_event(
        //        &emitted_events[0],
        //        Some(AccountId::from([0x01; 32])),
        //        "Gekki".to_string(),
        //    );

        //    assert_eq!(contract.get_events(), Err(Error::NotRegisteredAsOrganizer)); 
        //}

        //#[ink::test]
        //fn get_event_fails_when_no_events_are_registered() {
        //    let mut contract = ConcertTicketingSystem::new();

        //    assert_eq!(contract.register_organizer("Gekki".to_string()), Ok(()));
        //    assert_eq!(contract.get_organizer().unwrap(), "Gekki".to_string());

        //    let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
        //    assert_eq!(1, emitted_events.len());
        //    assert_account_event(
        //        &emitted_events[0],
        //        Some(AccountId::from([0x01; 32])),
        //        "Gekki".to_string(),
        //    );

        //    assert_eq!(contract.get_events(), Err(Error::NoEventsRegistered)); 
        //}
    }
}
