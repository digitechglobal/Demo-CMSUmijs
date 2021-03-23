export default function(initialState: any) {
    // Lấy user infomation (role) từ app.ts
    let role: string = 'ANONYMOUS';
    const data = initialState;
    if (data && typeof data.role === 'string') {
        role = data.role
    }

    return {
        canReadFoo: role === 'CUSTOMER',
        canReadFoo: role === 'ADMIN',
        canUpdateFoo: role === 'ADMIN',
    };
  }