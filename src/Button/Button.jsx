import styles from './styles.module.scss';
/* eslint-disable react/prop-types */
function MyButton({ isSelected, onClick }) {
    const { btn } = styles;
    return (
        <div className='d-flex justify-content-between'>
            <button
                className={`${btn}`}
                onClick={onClick}
                style={{
                    backgroundColor: isSelected ? 'green' : 'white'
                }}
            />
            <input
                type='text'
                placeholder='Trẻ'
                className='form-control w-50'
            />
        </div>
    );
}

export default MyButton;
