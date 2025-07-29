import React from 'react';
import Title from './Title';

interface NumberedListProps {
    title: string;
    items: (string | ListItem)[];
    startNumber?: number;
}

interface ListItem {
    text: string;
    subItems?: string[];
}

export default function NumberedList({
    title,
    items,
    startNumber = 1
}: NumberedListProps) {
    return (
        <div>
            <div className="numbered-list-titles">
                <Title
                    text={title}
                    fontSize={24}
                />
            </div>
            <ol 
                className="numbered-list-indices"
                style={{ listStyleType: 'decimal' }}
                start={startNumber}
            >
                {items.map((item, index) => (
                    <li
                        className="numbered-list-item"
                        key={index}
                    >
                        {typeof item === 'string' ? item : item.text}
                        {typeof item === 'object' && item.subItems && (
                            <ol
                                className="numbered-list-indices"
                                style={{ listStyleType: 'lower-alpha' }}
                                type="a"
                            >
                                {item.subItems.map((subItem, subIndex) => (
                                    <li
                                        className="numbered-list-item sub-items"
                                        key={subIndex}
                                    >
                                        {subItem}
                                    </li>
                                ))}
                            </ol>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
}