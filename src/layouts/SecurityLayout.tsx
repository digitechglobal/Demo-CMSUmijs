import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import type { ConnectProps } from 'umi';
import { Redirect, connect } from 'umi';
import { stringify } from 'querystring';
import type { ConnectState } from '@/models/connect';
import type { CurrentUser } from '@/models/user';

type SecurityLayoutProps = {
  loading?: boolean;
  currentUser?: CurrentUser;
} & ConnectProps;

type SecurityLayoutState = {
  isReady: boolean;
};

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;

    // Thực thi action gọi hàm chờ để lấy user infomation từ user model
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }

  render() {
    const { isReady } = this.state;

    // Lấy user infomation từ prop được connect store ở dưới cùng
    const { children, loading, currentUser } = this.props;

    // Đặt cờ kiểm tra có đăng nhập hay chưa
    const isLogin = currentUser && currentUser.id;

    const queryString = stringify({
      redirect: window.location.href,
    });

    // Nếu đã có user infomation thì set user infomation xuống local storage
    if (isLogin) {
      // Vì thông tin ở dạng object nên phải serialize bằng json stringify để parse sang dạng chuỗi
      localStorage.setItem("user_info", JSON.stringify(currentUser));
    }
    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }
    if (!isLogin && window.location.pathname !== '/user/login') {
      localStorage.clear()
      return <Redirect to={`/user/login?${queryString}`} />;
    }
    return children;
  }
}

// Connect với store của redux để lấy user infomation
export default connect(({ user, loading }: ConnectState) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
