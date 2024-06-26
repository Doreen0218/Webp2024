import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid'; 
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: '名稱', width: 150 },
    { field: 'location', headerName: '地點', width: 150 },
    { field: 'price', headerName:'票價', width: 150}
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6');
        const newData = response.data.map((item, index) => ({
          id: index, // 確保每行有唯一的 id
          title: item.title,
          location: item.showInfo[0].location,
          price: item.showInfo[0].price
        }));
        setData(newData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []); // 空數組

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </div>
  );
}

export default App;