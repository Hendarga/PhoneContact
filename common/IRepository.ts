export interface IRepository<T> {
    /// <summary>
    /// Create a new object of type T
    /// </summary>
    /// <param name="pattern">The object to create</param>
    create(object: T): void;
    /// <summary>
    /// Read all objects of type T
    /// </summary>
    /// <returns>All objects of type T</returns>
    read(): T[];
    /// <summary>
    /// Update an object of type T
    /// </summary>
    /// <param name="index">The index of the object to update</param>
    /// <param name="newObject">The updated object</param>
    update(index: number, newObject: T): void;
    /// <summary>
    /// Delete an object of type T
    /// </summary>
    /// <param name="index">The index of the object to delete</param>
    delete(index: number): void;
}