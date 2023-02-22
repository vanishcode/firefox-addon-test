import React, { useState } from 'react';

import { SortableList } from './components/list';

function createRange(length, initializer) {
  return [...new Array(length)].map((_, index) => {
    return initializer(index);
  });
}

function getMockItems() {
  return createRange(50, (index) => {
    return { id: index + 1 };
  });
}

export default function App() {
  const [items, setItems] = useState(getMockItems);

  return (
    <div style={{ maxWidth: 360, margin: '30px auto' }}>
      <SortableList
        items={items}
        onChange={setItems}
        renderItem={(item) => {
          return (
            <SortableList.Item id={item.id}>
              {item.id}
              <SortableList.DragHandle />
            </SortableList.Item>
          );
        }}
      />
    </div>
  );
}
