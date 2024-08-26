import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './CollegeTable.css';
import collegesData from '../colleges.json';
import SearchBar from '../SearchBar';

const CollegeTable = () => {
  const [colleges, setColleges] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  useEffect(() => {
    // Load initial data
    setColleges(collegesData.slice(0, 100));
  }, []);

  const fetchMoreData = () => {
    setTimeout(() => {
      setColleges((prev) => [
        ...prev,
        ...collegesData.slice(prev.length, prev.length + 10),
      ]);
    }, 1000);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }

    setSortConfig({ key, direction });
  };

  const sortedColleges = React.useMemo(() => {
    let sortableColleges = [...colleges];
    if (sortConfig.key !== '') {
      sortableColleges.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableColleges;
  }, [colleges, sortConfig]);

  const filteredColleges = sortedColleges.filter((college) =>
    college.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <InfiniteScroll
        dataLength={colleges.length}
        next={fetchMoreData}
        hasMore={colleges.length < collegesData.length}
        loader={<h4>Loading...</h4>}
      >
        <table className="college-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>Name</th>
              <th onClick={() => handleSort('rating')}>Collegedunia Rating</th>
              <th onClick={() => handleSort('fees')}>Fees</th>
              <th onClick={() => handleSort('userReview')}>User Review Rating</th>
              <th>Featured</th>
            </tr>
          </thead>
          <tbody>
            {filteredColleges.map((college) => (
              <tr key={college.id}>
                <td>{college.name}</td>
                <td>{college.rating}</td>
                <td>{college.fees}</td>
                <td>{college.userReview}</td>
                <td>{college.featured ? 'Featured' : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
};

export default CollegeTable;
