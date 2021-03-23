const Footer = () => {
    return (
        <div>
            <hr />
            <p style={{
                textAlign: 'center',
                margin: '20px 0px',
                color: 'gray',
            }}>
                copyright @ {`${new Date().getFullYear()} digitech solutions`}
            </p>
        </div>
    )
}

export default Footer