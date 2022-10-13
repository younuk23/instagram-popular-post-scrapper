import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

function Hello() {
  return <h1>Hello</h1>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
