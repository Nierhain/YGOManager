import { useHistory } from 'react-router-dom'
import { Input } from 'antd'
const { Search } = Input


const SearchBar = () => {
    const history = useHistory();

    const onSearch = (value: string) => {
        if (value !== "") {   
            history.push('/search?search=' + value)
        }
    }
    return (
        <Search
        placeholder="Search card, passcode, type..."
        enterButton="Search"
        size="large"
        allowClear
        className="mt-3"
        onSearch={onSearch}
        />
    )
}

export default SearchBar