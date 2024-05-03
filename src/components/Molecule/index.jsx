import React from 'react';
import { MolViewer } from 'react-molviewer';

const Molecule = () => {
    // Пример данных о молекуле в формате строки SMILES
    const smilesData = 'CCO';

    // Создание Blob объекта из строки SMILES
    const molContent = new Blob([smilesData], { type: 'text/plain' });

    // Идентификатор типа представления (например, для молекулы кофеина)
    const viewType = 'mol_caffeine';

    // Функция, чтобы уведомить родительский компонент о начале загрузки молекулы
    const handleInit = () => {
        console.log("Viewer started loading the molecule");
    };

    // Функция, чтобы уведомить родительский компонент об окончании загрузки молекулы
    const handleComplete = () => {
        console.log("Viewer completed loading the molecule");
    };

    return (
        <MolViewer
            molContent={molContent}
            viewType={viewType}
            fnInit={handleInit}
            fnCb={handleComplete}
        />
    );
};

export default Molecule;
