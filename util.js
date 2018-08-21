const names = ['Jack', 'Mack', 'wack', 'Rocky', 'Tuckker', 'Bang', 'sack', 'zeem', 'jhdfkjd', 'cddd'];
const origins = ['New york', 'delhi', 'mumbai', 'chennai', 'New boston', 'LA', 'Ca', 'Sa', 'ma', 'gtsy'];
const destinations = [' Delhi', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Bangalore ', 'Kolkata', 'Surat', 'Pune', 'Jaipu', 'Lucknow'];

module.exports = function() {
    return {
        name: names[Math.floor(Math.random() * 10)],
        origin: origins[Math.floor(Math.random() * 10)],
        destination: destinations[Math.floor(Math.random() * 10)],
    };
};
