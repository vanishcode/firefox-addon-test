import React, { useMemo, useState } from 'react';
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import { DragHandle, SortableItem } from './item';
import { SortableOverlay } from './overlay';

export function SortableList({ items, onChange, renderItem }) {
    const [active, setActive] = useState(null);
    const activeItem = useMemo(() => {
        return items.find((item) => {
            return item.id === (active === null || active === 0 ? 0 : active.id);
        });
    }, [active, items]);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    return (<DndContext
        sensors={sensors}
        onDragStart={(params) => {
            console.log(params, 'start');
            const { active } = params;
            setActive(active);
        }}
        onDragEnd={(params) => {
            console.log(params, 'end');
            const { active, over } = params;
            if (over && active.id !== over?.id) {
                const activeIndex = items.findIndex(({ id }) => id === active.id);
                const overIndex = items.findIndex(({ id }) => id === over.id);
                onChange(arrayMove(items, activeIndex, overIndex));
            }
            setActive(null);
        }}
        onDragMove={(params) => {
            // console.log(params, 'move');
        }}
        onDragOver={(params) => {
            console.log(params, 'over');
        }}
        onDragCancel={(params) => {
            console.log(params, 'cancel');
            setActive(null);
        }}
    >
        <SortableContext items={items}>
            <ul className="SortableList" role="application">
                {items.map((item) => (
                    <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
                ))}
            </ul>
        </SortableContext>
        <SortableOverlay>
            {activeItem ? renderItem(activeItem) : null}
        </SortableOverlay>
    </DndContext>)
}

SortableList.Item = SortableItem;
SortableList.DragHandle = DragHandle;
