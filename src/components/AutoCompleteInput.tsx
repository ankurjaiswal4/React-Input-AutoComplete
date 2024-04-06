import { useCallback, useState } from "react";
import _debounce from 'lodash/debounce';
export default function AutoCompleteInput(props: { label: any; data: any; }) {
    const [inputValue, setInputValue] = useState('');
    const [suggestedValues, setSuggestedValues] = useState<any[]>([]);
    
    const fetchAutocompleteData = (query: string) => {
        console.log("🚀 ~ fetchAutocompleteData ~ query:", query)
        const filteredData = Object.entries(data).filter((v: any) => {
            if(v[0].toLowerCase().includes(query.toLowerCase()) || v[1].toLowerCase().includes(query.toLowerCase())) {
               return v;
            }
        });
        console.log("🚀 ~ filteredData ~ filteredData:", filteredData)
        setSuggestedValues(filteredData);
    }    

    const debouncedFetchAutocompleteData = useCallback(_debounce(fetchAutocompleteData, 300), []);

    const handleInput = (e: any) => {
        setInputValue(e.target.value);
        debouncedFetchAutocompleteData(e.target.value);
    }
    const {label, data} = props;
    return <div>{label}: <input placeholder="Enter your query" value={inputValue} type="text" onChange={(e) => handleInput(e)}/>
    {suggestedValues && suggestedValues.map(v => {
       return <div>{v}</div>
    })}
    
    </div>
}