import React, {useCallback, useEffect, useState} from 'react';
import { Directory, Filesystem } from '@capacitor/filesystem';
import MemoriesContext, {Memory} from "./memories-context";
import { Storage } from '@capacitor/storage';

const MemoriesContextProvider: React.FC = (props) => {
    const [memories, setMemories] = useState<Memory[]>([]);

    useEffect(() => {
        const storableMemories = memories.map((memory) => {
            return {
                id: memory.id,
                title: memory.title,
                imagePath: memory.imagePath,
                location: memory.location,
                type: memory.type,
            };
        });

        Storage.set({ key: 'memories', value: JSON.stringify(storableMemories) });
    }, [memories]);

    const addMemory = (
        path: string,
        base64Data: string,
        title: string,
        location: { lat: number; lng: number },
        type: 'good' | 'bad'
    ) => {
        const newMemory: Memory = {
            id: Math.random().toString(),
            title,
            location,
            type,
            imagePath: path,
            base64Url: base64Data,
        };

        setMemories((currMemories) => {
            return [...currMemories, newMemory];
        });
    };

    const initContext = useCallback(async () => {
        const memoriesData = await Storage.get({ key: 'memories' });

        const storedMemories = memoriesData.value
            ? JSON.parse(memoriesData.value)
            : [];
        const loadedMemories: Memory[] = [];

        for (const storedMemory of storedMemories) {
            const file = await Filesystem.readFile({
                path: storedMemory.imagePath,
                directory: Directory.Data,
            });

            loadedMemories.push({
                id: storedMemory.id,
                title: storedMemory.title,
                location: storedMemory.location,
                type: storedMemory.type,
                imagePath: storedMemory.imagePath,
                base64Url: 'data:image/jpeg;base64,' + file.data,
            });
        }

        setMemories(loadedMemories);
    }, []);

    return (
        <MemoriesContext.Provider value={{ memories, addMemory, initContext }}>
            {props.children}
        </MemoriesContext.Provider>
    );
};

export default MemoriesContextProvider;