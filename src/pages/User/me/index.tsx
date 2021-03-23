import React, { useMemo } from 'react'
import { useAccess, Access } from 'umi';
import { getCurrentUserInfo } from "@/services/APILibrary"
import { useModel } from '@/.umi/plugin-model/useModel';

const getMe = (props) => {
    const [data, setData] = React.useState({
        name: '',
        email: '',
        phone: '',
        role: '',
    })

    // const { initialState, loading, error, refresh, setInitialState } = useModel('@@initialState');
    // console.log("🚀 ~ file: index.tsx ~ line 9 ~ getMe ~ initialState", initialState.role)

    async function getData() {
        const res = await getCurrentUserInfo()
        setData({
            name: res.firstName + ' ' + res.lastName,
            email: res.email,
            phone: res.phone,
            role: res.role,
        })
    }

    useMemo(() => {
        getData()
    }, [])

    // const { foo } = props;
    // const access = useAccess();

    // if (access.canReadFoo) {
    //     data.role
    // }
   

    return (
        <div>
            <h1>{data.name}</h1>
            <h1>{data.email}</h1>
            <h1>{data.phone}</h1>
            <h1>{data.role}</h1>
        </div>

        // <div>
        //     <Access
        //         accessible={access.canReadFoo}
        //         fallback={<div>Can not read foo content.</div>}
        //     >
        //         Foo content.
        //     </Access>
        //     <Access
        //         accessible={access.canUpdateFoo}
        //         fallback={<div>Can not update foo.</div>}
        //     >
        //         Update foo.
        //     </Access>
        //     <Access
        //         accessible={access.canDeleteFoo(foo)}
        //         fallback={<div>Can not delete foo.</div>}
        //     >
        //         Delete foo.
        //     </Access>
        // </div>
    )
}

export default getMe