import React, { useState } from 'react';
import s from '../Filters.module.scss';
import { useAppSelector } from '../../../../hooks/reduxHooks';
import { CatElements } from './CatElement/CatElements';

interface CategoriesProps {
  isGlobalMusic: boolean;
}

const Categories: React.FC<CategoriesProps> = ({ isGlobalMusic }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { filters, filterGenre } = useAppSelector((state) =>
    isGlobalMusic ? state.allMusic : state.userMusic,
  );

  return (
    <div className={s.categories}>
      <h2>
        Категории:
        <span onClick={() => setIsPopupOpen((prev) => !prev)} className={s.categories_dropDown}>
          <div className={s.categories_selectedGenre}>
            {filterGenre.catTitle.toUpperCase() || filters[0].catTitle.toUpperCase()}
          </div>
          {isPopupOpen && (
            <ul className={s.categories_list}>
              {filters.map((genre) => (
                <CatElements
                  key={genre.catKey}
                  genre={genre}
                  filterGenre={filterGenre}
                  isGlobalMusic={isGlobalMusic}
                />
              ))}
            </ul>
          )}
        </span>
      </h2>
    </div>
  );
};
export default Categories;
