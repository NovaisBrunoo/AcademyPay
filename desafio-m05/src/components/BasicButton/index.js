import './style.css';

export default function BasicButton({ title, click }) {

    return (
        <button className='basic-btn'>
            {title}
        </button>
    );
}