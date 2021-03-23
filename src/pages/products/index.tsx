import React, { useMemo } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Table } from 'antd'
import { getProductList } from '../../services/APILibrary'

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Name',
        key: 'name',
        align: 'left',
        render: text => <>
            {/* <p>
                {text.SKU}
            </p> */}
            <p>{text.name}</p>
        </>
    },
    {
        title: 'Price',
        key: 'salePrice',
        align: 'right',
        render: text => <>
            {text.salePrice} VND
        </>
    },
];

const Products = () => {

    //Creating array to contain data
    const [data, setData] = React.useState({
        items: [], //data
        total: 0, //total of data
    })

    //Setting data displayed limit and current page
    const [params, setParams] = React.useState({
        limit: 10, //page size
        page: 1, //current page
    })

    //Fetching data
    async function getData() {
        const res = await getProductList(params.limit, params.page)
        setData({
            items: res.data,
            total: res.total,
        })
    }

    //Update page of data 
    useMemo(() => {
        getData()
    }, [params])
    
    //Changing current page and page size
    const onTableChange = (pageCurrent: number, size: number) => {
        setParams({
            limit: size,
            page: pageCurrent,
        })
    }

    return (
        <PageHeaderWrapper>
            <Table
                columns={columns}
                dataSource={data.items}
                pagination={{
                    showSizeChanger: true,
                    pageSize: params.limit,
                    current: params.page,
                    onChange: onTableChange,
                    total: data.total,
                }}
            />
            <p>{new Date().getTime()}</p>
            <p>{localStorage.getItem('expires_time')}</p>
        </PageHeaderWrapper>
    )
}

export default Products