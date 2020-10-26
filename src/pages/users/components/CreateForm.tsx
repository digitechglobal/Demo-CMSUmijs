import React from 'react';
import { Modal } from 'antd';

interface CreateFormProps {
    modalVisible: boolean;
    onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
    const {modalVisible, onCancel } = props;

    return (
        <Modal
            destroyOnClose
            title = "Thêm user"
            visible = {modalVisible}
            onCancel = {() => oncancel}
            footer={null}
        >
            {props.children}
        </Modal>
    );
};

export default CreateForm;