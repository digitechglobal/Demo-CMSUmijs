export async function getInitialState() {
    // const data = getCurrentUserInfo()

    // Lấy user infomation trong local storage
    const user: any = window.localStorage.getItem('user_info');
    // Parse user infomation sang dạng json để trả về 
    const parseJsonUser = JSON.parse(user);
    return parseJsonUser;
}