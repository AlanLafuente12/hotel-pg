import { StyleDefinition } from './style-definition';
import { IQR } from '../interfaces';
/**
 * Class that create a QR code
 */
export declare class QR extends StyleDefinition<QR, IQR> {
    private _code;
    /**
     * @param _code receives a code
     */
    constructor(_code: string);
    /**
     * Set a size to the QR
     * @param fit the size
     */
    fit(fit: number): QR;
    /**
     * Set a version to the QR
     * @param version the version
     */
    version(version: number): QR;
    /**
     * Set a foreground to the QR
     * @param foreground the color
     */
    foreground(foreground: string): QR;
    /**
     * Set a ecc level to the QR
     * @param eccLevel the level
     */
    eccLevel(eccLevel: 'L' | 'M' | 'Q' | 'H'): QR;
    /**
     * Set a mode to the QR
     * @param mode the size
     */
    mode(mode: 'numeric' | 'alphanumeric' | 'octet'): QR;
    /**
     * Set a mask to the QR
     * @param mask the size
     */
    mask(mask: number): QR;
}
//# sourceMappingURL=qr.d.ts.map