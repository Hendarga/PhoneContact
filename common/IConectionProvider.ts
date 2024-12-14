/**
 * Interface for a connection provider.
 * 
 * This interface defines the contract for a connection provider, 
 * which is responsible for building a connection string based on the entity name.
 */
export interface IConnectionProvider {
    /**
     * Builds a connection string for the given entity name.
     * 
     * @param entityName The name of the entity for which to build the connection string.
     * @returns The built connection string, or undefined if the entity name is invalid.
     */
    build(entityName: string): string | undefined;
}
