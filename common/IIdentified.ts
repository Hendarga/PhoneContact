
/**
 * Interface representing an identified entity.
 *
 * @template K - The type of the identifier.
 *
 * @property {K} id - The unique identifier for the entity.
 */
export interface IIdentified<K> {    
    id: K;
}