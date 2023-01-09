import HeadlessTippy from "@tippyjs/react/headless";

import { faCircleXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import cellphonesApi from "~/api/cellphonesApi";
import { searchProduct } from "~/appRedux/actions/productAction";
import { SearchIcon } from "~/components/Icons";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import { useDebounce } from "~/hooks";
import styles from "./Search.module.scss";
import SearchItem from "./SearchIteam";

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [products] = useState([...Array(5).keys()])
    const [loading, setLoading] = useState(false);
    const inputRef = useRef()
    const debouncedValue = useDebounce(searchValue, 600);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() =>{
        if(!debouncedValue.trim()){
            setSearchResult([]);
            return;
        }
        const fetchApi = async () => {
            setLoading(true);
            const result = await cellphonesApi.searchProduct(debouncedValue);
            setSearchResult(result.data);
            await dispatch(searchProduct(debouncedValue));
            setLoading(false);
        }
        fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue])
    const handleHideResult = () => {
        setShowResult(false)
    }
    const handleClear = () => {
        setSearchValue('')
        setSearchResult([])
        inputRef.current.focus();
    }
    const handleChange = (e) => {
        const searchValue = e.target.value;
        if(!searchValue.startsWith(' ')){
            setSearchValue(searchValue);
        }
    }
    const handleKeyDown = (event) => {
        if(event.key === 'Enter'){
            navigate('/product/search');
        }
    }
    const handleClickMenuHide = useCallback(() => {
      setShowResult(false)
    }, [])
  return (
    <>
      <HeadlessTippy
        interactive
        visible={showResult && searchResult.length > 0 }
        render={(attrs) => (
          <div className={cx("search-result")} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h5 className={cx("search-title")}>Sản phẩm tìm kiếm</h5>
              {
                products.map((item) => {
                    const data = searchResult[item];
                    return (data && <SearchItem onHideResultClick={handleClickMenuHide} key={item} data={data} />)
                })
              }
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx("search")}>
          <input
            ref={inputRef}
            value={searchValue}
            spellCheck={false}
            onChange={handleChange}
            placeholder="Bạn cần tìm gì ?" 
            onFocus={() => setShowResult(true)}
            onKeyDown={handleKeyDown}
         />
          {!!searchValue && !loading &&
            (<button className={cx("clear")} onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>)
          }
          {loading && <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />}

          <button className={cx("search-btn")} onMouseDown={(e) => e.preventDefault()}>
            <SearchIcon />
          </button>
        </div>
      </HeadlessTippy>
    </>
  );
}

export default Search;
