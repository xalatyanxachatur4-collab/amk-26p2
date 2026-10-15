import { Router } from 'express';
import { coreSystemsList } from '../services/systemDataService.js';
export const systemsRouter = Router();
systemsRouter.get('/', (req, res) => {
    res.json({
        count: coreSystemsList.length,
        systems: coreSystemsList,
    });
});
systemsRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const system = coreSystemsList.find((s) => s.id.toLowerCase() === id.toLowerCase());
    if (!system) {
        return res.status(404).json({ error: `System with id '${id}' not found` });
    }
    return res.json(system);
});
