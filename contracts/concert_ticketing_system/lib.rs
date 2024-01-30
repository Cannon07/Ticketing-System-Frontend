#![cfg_attr(not(feature = "std"), no_std)]

#[ink::contract]
mod concert_ticketing_system {

    use ink::storage::Mapping;
    use ink::prelude::string::String;

    #[ink(storage)]
    pub struct ConcertTicketingSystem {
        users: Mapping<AccountId, String>, 
        organizers: Mapping<AccountId, String>,
    }

    #[ink(event)]
    pub struct AccountModified {
        #[ink(topic)]
        account: Option<AccountId>,
        data: String,
    } 


    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        AlreadyRegisteredAsUser,
        NotRegisteredAsUser,
        AlreadyRegisteredAsOrganizer,
        NotRegisteredAsOrganizer,
    }

    pub type Result<T> = core::result::Result<T, Error>;

    impl ConcertTicketingSystem {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self { 
                users: Mapping::default(), 
                organizers: Mapping::default(),
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
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        type Event = <ConcertTicketingSystem as ::ink::reflect::ContractEventBase>::Type;

        fn assert_event(event: &ink::env::test::EmittedEvent, expected_from: Option<AccountId>, expected_data: String) {
            let decoded_event = <Event as scale::Decode>::decode(&mut &event.data[..])
                .expect("encountered invalid contract event data buffer");
            if let Event::AccountModified(AccountModified { account, data }) = decoded_event {
                assert_eq!(account, expected_from, "encountered invalid AccountModified.user");
                assert_eq!(data, expected_data, "encountered invalid AccountModified.data");
            } else {
                panic!("encountered unexpected event kind: expected a AccountModified event")
            }
        }

        #[ink::test]
        fn register_user_works() {
            let mut contract = ConcertTicketingSystem::new(); 

            assert_eq!(contract.register_user("Gekki".to_string()), Ok(()));
            assert_eq!(contract.get_user().unwrap(), "Gekki".to_string());
            
            let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
            assert_eq!(1, emitted_events.len());
            assert_event(
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
            assert_event(
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
            assert_event(
                &emitted_events[0],
                Some(AccountId::from([0x01; 32])),
                "Gekki".to_string(),
            );

            assert_eq!(contract.update_user("Hello".to_string()), Ok(()));
            assert_eq!(contract.get_user().unwrap(), "Hello".to_string());
            
            let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
            assert_eq!(2, emitted_events.len());
            assert_event(
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
            assert_event(
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
            assert_event(
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
            assert_event(
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
            assert_event(
                &emitted_events[0],
                Some(AccountId::from([0x01; 32])),
                "Gekki".to_string(),
            );

            assert_eq!(contract.update_organizer("Hello".to_string()), Ok(()));
            assert_eq!(contract.get_organizer().unwrap(), "Hello".to_string());
            
            let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
            assert_eq!(2, emitted_events.len());
            assert_event(
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
            assert_event(
                &emitted_events[0],
                Some(AccountId::from([0x01; 32])),
                "Gekki".to_string(),
            );

            assert_eq!(contract.update_organizer("Hello".to_string()), Err(Error::NotRegisteredAsOrganizer));
        }
    }
}
