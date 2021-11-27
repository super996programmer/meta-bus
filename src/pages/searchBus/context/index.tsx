import type { FC, Context, Dispatch, SetStateAction } from 'react';
import { useState, useMemo, createContext } from 'react';

export interface ISearchResult {
    routeUID: string;
    routeName: string;
    departureStopName: string;
    destinationStopName: string;
}

interface ISearchBusContext {
    searchValue: string;
    setSearchValue: Dispatch<SetStateAction<string>>;
    isInputFocus: boolean;
    setIsInputFocus: Dispatch<SetStateAction<boolean>>;
    hasSearched: boolean;
    setHasSearched: Dispatch<SetStateAction<boolean>>;
    searchResult: ISearchResult[];
    setSearchResult: Dispatch<SetStateAction<ISearchResult[]>>;
    searchHistory: ISearchResult[];
    setSearchHistory: Dispatch<SetStateAction<ISearchResult[]>>;
}

export const SearchBusContext: Context<ISearchBusContext> = createContext<ISearchBusContext>({
    searchValue: '',
    setSearchValue: () => {},
    isInputFocus: false,
    setIsInputFocus: () => {},
    hasSearched: false,
    setHasSearched: () => {},
    searchResult: [],
    setSearchResult: () => {},
    searchHistory: [],
    setSearchHistory: () => {},
});

export const SearchBusContextProvider: FC = (({children}) => {
    // For SearchInput
    const [searchValue, setSearchValue] = useState('');
    const [isInputFocus, setIsInputFocus] = useState(false);
    // For SearchContent
    const [hasSearched, setHasSearched] = useState(false);
    const [searchResult, setSearchResult] = useState<ISearchResult[]>([]);
    const [searchHistory, setSearchHistory] = useState<ISearchResult[]>([]);

    const context = useMemo(() => ({
            searchValue,
            setSearchValue,
            isInputFocus,
            setIsInputFocus,
            hasSearched,
            setHasSearched,
            searchResult,
            setSearchResult,
            searchHistory,
            setSearchHistory
        }), [searchValue,
        setSearchValue,
        isInputFocus,
        setIsInputFocus,
        hasSearched,
        setHasSearched,
        searchResult,
        setSearchResult,
        searchHistory,
        setSearchHistory])

    return (
        <SearchBusContext.Provider value={context}>
            {children}
        </SearchBusContext.Provider>
    )
})