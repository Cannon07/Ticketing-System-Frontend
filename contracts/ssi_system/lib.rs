#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod ssi_system {

    use ink::prelude::string::String;
    use ink::storage::Mapping;

    #[ink(storage)]
    pub struct SsiSystem {
        issuers: Mapping<AccountId, String>,
        verifiers: Mapping<AccountId, String>,
    }

    #[ink(event)]
    pub struct IssuerModified {
        #[ink(topic)]
        account: Option<AccountId>,
        data: String,
    }

    #[ink(event)]
    pub struct VerifierModified {
        #[ink(topic)]
        account: Option<AccountId>,
        data: String,
    }

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        AlreadyRegisteredAsIssuer,
        AlreadyRegisteredAsVerifier,
    }

    pub type Result<T> = core::result::Result<T, Error>;

    impl SsiSystem {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self { 
                issuers: Mapping::default(),
                verifiers: Mapping::default(),
            }
        }

        #[ink(message)]
        pub fn register_issuer(&mut self, did: String) -> Result<()> {
            let caller = self.env().caller();

            if self.issuers.contains(caller) {
                return Err(Error::AlreadyRegisteredAsIssuer)
            }

            if self.verifiers.contains(caller) {
                return Err(Error::AlreadyRegisteredAsVerifier)
            }

            self.issuers.insert(caller, &did);

            Self::env().emit_event(IssuerModified {
                account: Some(caller),
                data: did,
            });

            Ok(())
        }

        #[ink(message)]
        pub fn get_issuer(&self) -> Option<String> {
            let caller = self.env().caller();
            self.issuers.get(caller)
        }

        #[ink(message)]
        pub fn register_verifier(&mut self, did: String) -> Result<()> {
            let caller = self.env().caller();

            if self.verifiers.contains(caller) {
                return Err(Error::AlreadyRegisteredAsVerifier)
            }

            if self.issuers.contains(caller) {
                return Err(Error::AlreadyRegisteredAsIssuer)
            }

            self.verifiers.insert(caller, &did);

            Self::env().emit_event(VerifierModified {
                account: Some(caller),
                data: did,
            });

            Ok(())
        }

        #[ink(message)]
        pub fn get_verifier(&self) -> Option<String> {
            let caller = self.env().caller();
            self.verifiers.get(caller)
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        #[ink::test]
        fn register_issuer_works() {
            let mut ssi_system = SsiSystem::new();
            assert_eq!(ssi_system.register_issuer("Hello".to_string()), Ok(()));
            assert_eq!(ssi_system.get_issuer().unwrap(), "Hello".to_string());
        }

        #[ink::test]
        fn register_issuer_fails_when_already_registered_as_issuer() {
            let mut ssi_system = SsiSystem::new();
            assert_eq!(ssi_system.register_issuer("Hello".to_string()), Ok(()));
            assert_eq!(ssi_system.get_issuer().unwrap(), "Hello".to_string());
            assert_eq!(ssi_system.register_issuer("Hello1".to_string()), Err(Error::AlreadyRegisteredAsIssuer));
        }

        #[ink::test]
        fn register_issuer_fails_when_already_registered_as_verifier() {
            let mut ssi_system = SsiSystem::new();
            assert_eq!(ssi_system.register_verifier("Hello".to_string()), Ok(()));
            assert_eq!(ssi_system.get_verifier().unwrap(), "Hello".to_string());
            assert_eq!(ssi_system.register_issuer("Hello1".to_string()), Err(Error::AlreadyRegisteredAsVerifier));
        }

        #[ink::test]
        fn register_verifier_works() {
            let mut ssi_system = SsiSystem::new();
            assert_eq!(ssi_system.register_verifier("Hello".to_string()), Ok(()));
            assert_eq!(ssi_system.get_verifier().unwrap(), "Hello".to_string());
        }

        #[ink::test]
        fn register_verifier_fails_when_already_registered_as_verifier() {
            let mut ssi_system = SsiSystem::new();
            assert_eq!(ssi_system.register_verifier("Hello".to_string()), Ok(()));
            assert_eq!(ssi_system.get_verifier().unwrap(), "Hello".to_string());
            assert_eq!(ssi_system.register_verifier("Hello1".to_string()), Err(Error::AlreadyRegisteredAsVerifier));
        }

        #[ink::test]
        fn register_verifier_fails_when_already_registered_as_issuer() {
            let mut ssi_system = SsiSystem::new();
            assert_eq!(ssi_system.register_issuer("Hello".to_string()), Ok(()));
            assert_eq!(ssi_system.get_issuer().unwrap(), "Hello".to_string());
            assert_eq!(ssi_system.register_verifier("Hello1".to_string()), Err(Error::AlreadyRegisteredAsIssuer));
        }
    }
}
