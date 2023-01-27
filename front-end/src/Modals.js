import GivingModal from "./GivingModal";

export const Modals = ({
   currentUser, 
   loginIsOpen, 
   setLoginIsOpen, 
   logoutIsOpen, 
   setLogoutIsOpen, 
   signUpIsOpen, 
   setSignUpIsOpen,
   givingIsOpen,
   setGivingIsOpen,
   addEventIsOpen,
   setAddEventIsOpen,
   addHonorIsOpen,
   setAddHonorIsOpen,
   cancelFutureSubscriptionIsOpen,
   setCancelFutureSubscriptionIsOpen,
   cancelSubscriptionIsOpen,
   setCancelSubscriptionIsOpen,
   editProfileIsOpen,
   setEditProfileIsOpen}) => 
      <GivingModal 
         currentUser={currentUser} 
         givingIsOpen={givingIsOpen} 
         setGivingIsOpen={setGivingIsOpen}
      />