//@ts-nocheck
import React, { useEffect, useState } from "react";
import FilterOption from "../../atoms/FilterOption";
import { useDispatch } from "react-redux";
import { addFilter } from "../../../Store/Slices/filterSlice";

interface FilterOrganismProps {
  categories: string[];
  subcategories: string[];
  ratings: number[];
  levels: string[];
  languages: string[];
}


const FilterOrganism: React.FC<FilterOrganismProps> = ({
  categories,
  subcategories,
  ratings,
  levels,
  languages,
}) => {
  const [selectedFilters, setSelectedFilters] = useState<{
    category: string[];
    subcategory: string[];
    rating: string[];
    level: string[];
    language: string[];
  }>({
    category: [],
    subcategory: [],
    rating: [],
    level: [],
    language: [],
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addFilter(selectedFilters));
  }, [selectedFilters]);

  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const [showSubcategoryOptions, setShowSubcategoryOptions] = useState(false);
  const [showRatingOptions, setShowRatingOptions] = useState(false);
  const [showLevelOptions, setShowLevelOptions] = useState(false);
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);

  const handleCategoryToggle = (category: string) => {
    setSelectedFilters((prevFilters) => {
      const updatedCategoryFilters = prevFilters.category.includes(category)
        ? prevFilters.category.filter((c) => c !== category)
        : [...prevFilters.category, category];

      return {
        ...prevFilters,
        category: updatedCategoryFilters,
      };
    });
  };

  const handleSubcategoryToggle = (subcategory: string) => {
    setSelectedFilters((prevFilters) => {
      const updatedSubcategoryFilters = prevFilters.subcategory.includes(
        subcategory
      )
        ? prevFilters.subcategory.filter((sc) => sc !== subcategory)
        : [...prevFilters.subcategory, subcategory];

      return {
        ...prevFilters,
        subcategory: updatedSubcategoryFilters,
      };
    });
  };

  const handleRatingToggle = (rating: string) => {
    setSelectedFilters((prevFilters) => {
      const updatedRatingFilters = prevFilters.rating.includes(rating)
        ? prevFilters.rating.filter((r) => r !== rating)
        : [...prevFilters.rating, rating];

      return {
        ...prevFilters,
        rating: updatedRatingFilters,
      };
    });
  };

  const handleLevelToggle = (level: string) => {
    setSelectedFilters((prevFilters) => {
      const updatedLevelFilters = prevFilters.level.includes(level)
        ? prevFilters.level.filter((l) => l !== level)
        : [...prevFilters.level, level];

      return {
        ...prevFilters,
        level: updatedLevelFilters,
      };
    });
  };

  const handleLanguageToggle = (language: string) => {
    setSelectedFilters((prevFilters) => {
      const updatedLanguageFilters = prevFilters.language.includes(language)
        ? prevFilters.language.filter((d) => d !== language)
        : [...prevFilters.language, language];

      return {
        ...prevFilters,
        language: updatedLanguageFilters,
      };
    });
  };

  const toggleCategoryOptionsVisibility = () => {
    setShowCategoryOptions((prev) => !prev);
  };

  const toggleSubcategoryOptionsVisibility = () => {
    setShowSubcategoryOptions((prev) => !prev);
  };

  const toggleRatingOptionsVisibility = () => {
    setShowRatingOptions((prev) => !prev);
  };

  const toggleLevelOptionsVisibility = () => {
    setShowLevelOptions((prev) => !prev);
  };

  const toggleLanguageOptionsVisibility = () => {
    setShowLanguageOptions((prev) => !prev);
  };

  return (
    <div className="p-4 pl-0">
      <FilterOption
        title="Category"
        options={categories}
        showOptions={showCategoryOptions}
        toggleOptionsVisibility={toggleCategoryOptionsVisibility}
        selectedFilters={selectedFilters.category}
        handleToggle={(value) => handleCategoryToggle(value)}
      />

      <FilterOption
        title="Subcategory"
        options={subcategories}
        showOptions={showSubcategoryOptions}
        toggleOptionsVisibility={toggleSubcategoryOptionsVisibility}
        selectedFilters={selectedFilters.subcategory}
        handleToggle={(value) => handleSubcategoryToggle(value)}
      />

      <FilterOption
        title="Rating"
        options={ratings.map((r) => `${r}`)}
        showOptions={showRatingOptions}
        toggleOptionsVisibility={toggleRatingOptionsVisibility}
        selectedFilters={selectedFilters.rating}
        handleToggle={(value) => handleRatingToggle(value)}
        checkboxType={true}
      />

      <FilterOption
        title="Level"
        options={levels}
        showOptions={showLevelOptions}
        toggleOptionsVisibility={toggleLevelOptionsVisibility}
        selectedFilters={selectedFilters.level}
        handleToggle={(value) => handleLevelToggle(value)}
      />

      <FilterOption
        title="Language"
        options={languages}
        showOptions={showLanguageOptions}
        toggleOptionsVisibility={toggleLanguageOptionsVisibility}
        selectedFilters={selectedFilters.language}
        handleToggle={(value) => handleLanguageToggle(value)}
      />
    </div>
  );
};

export default FilterOrganism;
