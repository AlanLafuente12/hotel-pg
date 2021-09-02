import { IStyleDefinition } from '..';
/**
 * Interface that defines a toc item
 */
export interface ITocItem extends IStyleDefinition {
    readonly tocItem: boolean;
    readonly tocStyle?: IStyleDefinition;
    readonly tocMargin?: number | [number, number] | [number, number, number, number];
}
//# sourceMappingURL=toc-item.interface.d.ts.map