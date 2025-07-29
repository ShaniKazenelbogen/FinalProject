export const User = {
  async me() {
    // Get user data from localStorage (same as dashboards use)
    const userId = localStorage.getItem('userId');
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const userType = localStorage.getItem('userType');
    const email = localStorage.getItem('email');
    
    if (!userId || !userType) {
      throw new Error('Not signed in');
    }
    
    const getUserRole = (userType) => {
      switch (userType) {
        case '1':
        case 1:
          return 'manager';
        case '2':
        case 2:
          return 'therapist';
        case '3':
        case 3:
          return 'client';
        default:
          return 'user';
      }
    };
    
    return {
      id: userId,
      first_name: firstName,
      last_name: lastName,
      full_name: `${firstName || ''} ${lastName || ''}`.trim(),
      email: email,
      role: getUserRole(userType),
      userType: userType
    };
  },
  
  async logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('userType');
    localStorage.removeItem('email');
    localStorage.removeItem('user');
  }
};
