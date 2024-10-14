import exp from "constants";

/**
 * Constant representing the create action.
 */
export type ActionTypes = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'INIT' | 'COMMIT' | 'ROLLBACK' | 'VALIDATE';

/**
 * Interface representing an entity that can be updated.
 *
 * @template T - The type of the entity.
 */
export interface IElementUpdate<T> { 
    onUpdate(item: T, action: ActionTypes): void;
}