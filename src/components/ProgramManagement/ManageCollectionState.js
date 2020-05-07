/**
 * faciliates operations on collections' state.
 * it accepts a `[collectionState, updateCollectionState]`.
 * can be used with the `useState` hook:
 * ```
 * new ManageCollectionState(useState([...]))
 * ````
 */
class ManageCollectionState {
    constructor([collection, updateCollection]) {
        this.collection = collection;
        this.updateCollection = updateCollection;
    }

    addOne = (item) => this.updateCollection([...this.collection, item]);

    updateOne = (item, index) => {
        const current = [...this.collection];
        current[index] = { ...current[index], ...item };
        this.updateCollection(current);
    }

    removeOne = (index) => {
        const current = [...this.collection];
        current.splice(index, 1);
        this.updateCollection(current);
    }
    removeLast = () => this.removeOne(this.collection.length - 1);

    updateAll = (newCollection) => this.updateCollection(newCollection)
}

export default ManageCollectionState;