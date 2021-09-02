import { StyleDefinition } from './style-definition';
import { IImg } from '../interfaces';
/**
 * Class to create an image definition
 */
export declare class Img extends StyleDefinition<Img, IImg> {
    private url;
    private fromDefinition;
    /**
     * @param url Image URL or BASE64
     * @param fromDefinition It defines if the image is from definition "images" property
     */
    constructor(url: string, fromDefinition?: boolean);
    /**
     * It gets the content with the image in base64
     */
    build(): Promise<IImg>;
    /**
     * It fits the image
     * @param fit {[ number, number ]}
     */
    fit(fit: [number, number]): Img;
    /**
     * It adds opacity to the image
     * @param opacity 0 to 1
     */
    opacity(opacity: number): Img;
    /**
     * It converts a image URL to Base64 and set the image
     */
    private toBase64;
}
//# sourceMappingURL=image.d.ts.map