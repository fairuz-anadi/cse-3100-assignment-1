import { useEffect, useState } from 'react';

const availableCats = [
  { name: 'Whiskers', age: '2', breed: 'Persian' },
  { name: 'Mittens', age: '2', breed: 'Siamese' },
  { name: 'Shadow', age: '1', breed: 'Birman' },
  { name: 'Pumpkin', age: '3', breed: 'Sphynx' },
  { name: 'Luna', age: '4', breed: 'Abyssinian' },
  { name: 'Simba', age: '2', breed: 'Bengal' },
  { name: 'Felix', age: '3', breed: 'Peterbald' },
  { name: 'Bella', age: '1', breed: 'Persian' },
];

const breeds = ['Sphynx', 'Peterbald', 'Birman', 'Abyssinian', 'Persian', 'Bengal', 'Siamese'];

export default function AvailableCats() {
  const [cats, setCats] = useState([]);
  const [filteredCats, setFilteredCats] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    // Fetch cat images from an API endpoint and assign it to the cats list
    const fetchCatImages = async () => {
      try {
        const responses = await Promise.all(
          availableCats.map(() =>
            fetch('https://api.thecatapi.com/v1/images/search').then((res) =>
              res.json()
            )
          )
        );
        const catsWithImages = availableCats.map((cat, index) => ({
          ...cat,
          image: responses[index][0].url,
        }));

        setCats(catsWithImages);
        setFilteredCats(catsWithImages);
      } catch (error) {
        console.error('Error fetching cat images:', error);
      }
    };

    fetchCatImages();
  }, []);

  const handleFilter = () => {
    let filtered = cats;

    // Filter by breed
    if (selectedBreed) {
      filtered = filtered.filter(cat => cat.breed === selectedBreed);
    }

    // Filter by name (case insensitive)
    if (searchName.trim()) {
      filtered = filtered.filter(cat => 
        cat.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    setFilteredCats(filtered);
  };

  const handleReset = () => {
    setSelectedBreed('');
    setSearchName('');
    setFilteredCats(cats);
  };

  // Re-filter when breed or search changes
  useEffect(() => {
    handleFilter();
  }, [selectedBreed, searchName, cats]);

  return (
    <section className="text-center mt-4">
      <h2>Available Cats</h2>
      <p>Meet our adorable cats looking for their forever home!</p>

      <div className="filter-section">
        <div className="filter-group">
          <label htmlFor="breed-filter">Select Breed:</label>
          <select 
            id="breed-filter"
            value={selectedBreed}
            onChange={(e) => setSelectedBreed(e.target.value)}
          >
            <option value="">All Breeds</option>
            {breeds.map((breed) => (
              <option key={breed} value={breed}>{breed}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="name-search">Search by Name:</label>
          <input
            id="name-search"
            type="text"
            placeholder="Enter cat name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>&nbsp;</label>
          <button onClick={handleReset}>Reset Filters</button>
        </div>
      </div>

      <div className="cats-container">
        {filteredCats.length > 0 ? (
          filteredCats.map((cat, i) => (
            <div key={i}>
              <div className="cat-card">
                <img
                  src={cat.image}
                  alt={cat.name}
                />
                <div className="cat-info">
                  <h3 className="h5 mb-1">{cat.name}</h3>
                  <p className="mb-0">Age: {cat.age}</p>
                  <p className="mb-0">Breed: {cat.breed}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No cats found matching your criteria.</p>
        )}
      </div>
    </section>
  );
}