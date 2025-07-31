import { Pane } from 'tweakpane';
import { Observer, Observable, Material, float, BaseTexture as BaseTexture$1, Layer, AssetContainer, int, CubeTexture, Mesh, Light, DirectionalLight, Vector3, PointLight, SpotLight, HemisphericLight, Scene, PointerInfo, ISceneLoaderProgressEvent, Camera, IViewportLike, PBRMaterial, TransformNode, Skeleton, AnimationGroup, InstantiatedEntries, MorphTarget, BoundingBox, SSAORenderingPipeline, DefaultRenderingPipeline, ImageProcessingPostProcess, TAARenderingPipeline, Engine, ArcRotateCamera } from '@babylonjs/core';
import * as _babylonjs_serializers_glTF_2_0 from '@babylonjs/serializers/glTF/2.0';
import { Mesh as Mesh$1 } from '@babylonjs/core/Meshes/mesh';

interface IBaseObject {
    className: string;
}
declare abstract class BaseObject implements IBaseObject {
    #private;
    /**
     * Observable事件缓存集合，用于统一销毁
     */
    observer: Observer<any>[];
    /**
     *  唯一标识符，使用安全随机数生成，除从JSON反序列化外不允许修改
     */
    uuid: string;
    /**
     *  类名，子类必须实现
     *  用于序列化和反序列化时识别对象类型
     */
    abstract className: string;
    /**
     *  是否已就绪
     */
    isReady: boolean;
    /**
     * 就绪事件
     */
    onReady: Observable<BaseObject>;
    /**
     * 销毁事件
     */
    onDispose: Observable<BaseObject>;
    /**
     * 组件列表;
     * get 用于获取组件实例列表;
     * set 用于从元数据恢复组件实例列表.
     */
    get components(): BaseObject[];
    set components(value: any);
    /**
     * 获取类名
     * @returns 返回当前对象的类名
     */
    getClassName(): string;
    /**
     * 序列化对象元数据
     * @returns  返回当前对象的JSON表示形式
     */
    toJSON(): {
        className: string;
        uuid: string;
    };
    /**
     *  等待对象就绪
     *  如果对象已经就绪，则立即返回当前对象
     */
    readyNext(): Promise<this>;
    /**
     *  克隆对象
     *  子类必须实现此方法以返回一个新的实例
     */
    clone(): void;
    /**
     * 销毁对象
     */
    dispose(): void;
}

declare enum TransparencyMode {
    /**
     * 不透明
     */
    OPAQUE = 0,
    /**
     * 透明测试
     */
    ALPHATEST = 1,
    /**
     * 透明混合
     */
    ALPHABLEND = 2,
    /**
     * 透明测试和混合
     */
    ALPHATESTANDBLEND = 3
}
declare class BaseMaterial extends BaseObject {
    className: string;
    name: string;
    getBabylonMaterial: () => Material | void;
    getMitaApp: () => MitaApp;
    constructor(mita: MitaApp);
    /**
     * 透明度
     */
    get alpha(): float;
    set alpha(value: float);
    /**
     * 透明模式，0：不透明；1：透明测试；2：混合；3：透明测试和混合。
     */
    get transparencyMode(): TransparencyMode;
    set transparencyMode(value: TransparencyMode);
    /**
     * 是否开启双面材质。
     */
    get doubleSided(): boolean;
    set doubleSided(value: boolean);
    /**
     * 开启深度预渲染
     */
    get needDepthPrePass(): boolean;
    set needDepthPrePass(value: boolean);
    /**
     *
     * @param timeout 持续时间，单位秒
     *  @description 高亮材质，持续一段时间
     *  @returns Promise<void>
     */
    hightLight(timeout?: float): Promise<void>;
    /**
     * @param speed 时间，单位秒
     * @returns Promise<void>
     * @description 聚焦材质，以mesh包围盒为准
     */
    focus(speed?: float): Promise<void>;
    toJSON(): {
        name: string;
        transparencyMode: TransparencyMode;
        alpha: number;
        doubleSided: boolean;
        needDepthPrePass: boolean;
        className: string;
        uuid: string;
    };
    /**
     * 获取材质配置
     * @returns 材质配置JSON
     */
    getMaterialSetting(): File;
}

declare enum UVChannel {
    UV1 = 0,
    UV2 = 1,
    UV3 = 2,
    UV4 = 3,
    UV5 = 4,
    UV6 = 5
}
interface IBaseTexture {
    /**
     * 缩略图地址，url或baseUrl。
     */
    get thumbnail(): string;
    /**
     * 获取缩略图
     * @returns blob string 缩略图临时地址
     */
    getThumbnail(): Promise<string>;
    /**
     * 销毁缩略图
     */
    disposeThumbnail: () => void;
}
declare abstract class BaseTexture extends BaseObject implements IBaseTexture {
    #private;
    className: string;
    name: string;
    isClone: boolean;
    url: string | undefined;
    /**
     * 缩略图地址，url或baseUrl。
     */
    abstract get thumbnail(): string;
    abstract getThumbnail(): Promise<string>;
    abstract disposeThumbnail(): void;
    onThumbnailChange: Observable<string>;
    getBabylonTexture: () => BaseTexture$1 | void;
    /**
     * 纹理强度
     */
    get level(): float;
    set level(value: float);
    /**
     * UV集
     */
    get channel(): UVChannel;
    set channel(value: UVChannel);
    toJSON(): {
        name: string;
        isClone: boolean;
        level: number;
        channel: UVChannel;
        url: string | undefined;
        className: string;
        uuid: string;
    };
    dispose(): void;
}

/**
 * 场景背景图片管理
 */

declare class BackgroundImage extends BaseObject {
    #private;
    className: string;
    getMitaApp: () => MitaApp;
    getLayer: () => Layer | void;
    /**
     * 是否启用
     */
    get enabled(): boolean;
    set enabled(enabled: boolean);
    /**
     * 背景纹理
     */
    get texture(): BaseTexture | null;
    set texture(value: BaseTexture | string | null);
    constructor(mita: MitaApp);
    initLayer(): Promise<void>;
    /**
     * 设置背景图片
     * @param url 背景图片url
     */
    setImage(url: string, name: string): Promise<void>;
    toJSON(): {
        enabled: boolean;
        texture: string | undefined;
        className: string;
        uuid: string;
    };
    private setTexture;
    private setTextureByUUID;
    applySettings(value: any): void;
    dispose(): void;
}

interface IContainerParams {
    getAssetContainer: () => AssetContainer | void;
}
declare abstract class BaseContainer extends BaseObject implements IContainerParams {
    name: string;
    url: string | undefined;
    priority: int;
    className: string;
    onLoad: Observable<BaseContainer>;
    abstract getAssetContainer: () => AssetContainer | void;
    constructor();
    toJSON(): {
        url: string | undefined;
        priority: number;
        name: string;
        className: string;
        uuid: string;
    };
}

declare class ModelContainer extends BaseContainer {
    name: string;
    className: string;
    getAssetContainer: () => AssetContainer | void;
    constructor(mita: MitaApp, param?: any);
    toJSON(): {
        url: string | undefined;
        priority: number;
        name: string;
        className: string;
        uuid: string;
    };
    dispose(): void;
}

declare class MCubeTexture extends BaseTexture {
    #private;
    className: string;
    getMitaApp: () => MitaApp;
    _container: BaseContainer | undefined;
    getBabylonTexture: () => CubeTexture | void;
    set container(container: BaseContainer | string);
    get container(): BaseContainer | undefined;
    /**
     * rotationY变更事件
     */
    onRotationYChange: Observable<float>;
    /**
     * 旋转角度
     */
    get rotationY(): float;
    set rotationY(value: float);
    get thumbnail(): string;
    set thumbnail(thumbnail: string);
    getThumbnail(): Promise<string>;
    disposeThumbnail(): void;
    constructor(mita: MitaApp, params?: any);
    createBabylonTexture(container: BaseContainer): Promise<void>;
    getContainer(uuid: string): Promise<ModelContainer>;
    toJSON(): {
        container: string | undefined;
        rotationY: number;
        name: string;
        isClone: boolean;
        level: number;
        channel: UVChannel;
        url: string | undefined;
        className: string;
        uuid: string;
    };
    dispose(): void;
    clone(): MCubeTexture;
}

/**
 * 场景环境对象
 */

declare class Env extends BaseObject {
    #private;
    className: string;
    getMitaApp: () => MitaApp;
    onEnvTextureChange: Observable<Env>;
    constructor(mita: MitaApp);
    private init;
    /**
     * 是否启用
     */
    get enabled(): boolean;
    set enabled(enabled: boolean);
    /**
     * 环境贴图
     */
    get cubeTexture(): MCubeTexture | null;
    set cubeTexture(value: MCubeTexture | string | null);
    /**
     * 环境强度
     */
    get intensity(): float;
    set intensity(intensity: float);
    /**
     * 环境角度 0-360
     */
    get rotationY(): float;
    set rotationY(rotationY: float);
    /**
     *
     * @param url 环境文件地址
     * @param name 环境文件名称
     */
    setEnv(url: string, name: string): Promise<void>;
    toJSON(): {
        enabled: boolean;
        cubeTexture: string | undefined;
        intensity: number;
        rotationY: number;
        className: string;
        uuid: string;
    };
    private setTexture;
    private setTextureByUUID;
    applySettings(value: any): void;
    dispose(): void;
}

/**
 * 场景天空盒管理
 */

declare class SkyBox extends BaseObject {
    #private;
    className: string;
    getMitaApp: () => MitaApp;
    getSkyBox: () => Mesh | void;
    /**
     * 是否启用
     */
    get enabled(): boolean;
    set enabled(enabled: boolean);
    /**
     * 是否使用环境
     */
    get isEnv(): boolean;
    set isEnv(isEnv: boolean);
    /**
     * 模糊度
     */
    get blur(): float;
    set blur(blur: float);
    /**
     * 亮度
     */
    get intensity(): float;
    set intensity(intensity: float);
    constructor(mita: MitaApp);
    private init;
    private syncSkyBox;
    toJSON(): {
        isEnv: boolean;
        blur: number;
        intensity: number;
        enabled: boolean;
        className: string;
        uuid: string;
    };
    applySettings(value: any): void;
    dispose(): void;
}

/**
 * 灯光基类
 */
declare abstract class AbstractLight extends BaseObject {
    #private;
    className: string;
    abstract getBabylonLight: () => Light | void;
    getMitaApp: () => MitaApp;
    onColorChange: Observable<AbstractLight>;
    get enabled(): boolean;
    set enabled(value: boolean);
    /**
     * 强度
     */
    get intensity(): float;
    set intensity(value: float);
    /**
     * 基础颜色
     */
    get color(): string;
    set color(value: string);
    constructor(mitaApp: MitaApp);
    dispose(): void;
    toJSON(): {
        enabled: boolean;
        intensity: number;
        color: string;
        className: string;
        uuid: string;
    };
}

/**
 * 平行光对象
 */

declare class MDirectionalLight extends AbstractLight {
    #private;
    className: string;
    getBabylonLight: () => DirectionalLight | void;
    constructor(mitaApp: MitaApp, params?: any);
    onPositionChange: Observable<MDirectionalLight>;
    onTargetChange: Observable<MDirectionalLight>;
    get position(): Vector3;
    set position(value: Vector3);
    get target(): Vector3;
    set target(value: Vector3);
    get showDebug(): boolean;
    set showDebug(value: boolean);
    setPosition(position: Vector3): Promise<void>;
    setTarget(target: Vector3): Promise<void>;
    dispose(): void;
    toJSON(): {
        position: {
            x: number;
            y: number;
            z: number;
        };
        target: {
            x: number;
            y: number;
            z: number;
        };
        color: string;
        intensity: number;
        enabled: boolean;
        className: string;
        uuid: string;
    };
}

/**
 * 点光
 */

declare class MPointLight extends AbstractLight {
    #private;
    className: string;
    getBabylonLight: () => PointLight | void;
    constructor(mitaApp: MitaApp, params?: any);
}

/**
 * 平行光对象
 */

declare class MSpotLight extends AbstractLight {
    #private;
    className: string;
    getBabylonLight: () => SpotLight | void;
    constructor(mitaApp: MitaApp, params?: any);
    onPositionChange: Observable<MSpotLight>;
    onTargetChange: Observable<MSpotLight>;
    get position(): Vector3;
    set position(value: Vector3);
    get target(): Vector3;
    set target(value: Vector3);
    get showDebug(): boolean;
    set showDebug(value: boolean);
    /**
     * 角度 0 - 180
     */
    get degrees(): float;
    set degrees(value: float);
    /**
     * 衰减
     */
    get exponent(): float;
    set exponent(value: float);
    setPosition(position: Vector3): Promise<void>;
    setTarget(target: Vector3): Promise<void>;
    dispose(): void;
    toJSON(): {
        position: {
            x: number;
            y: number;
            z: number;
        };
        target: {
            x: number;
            y: number;
            z: number;
        };
        degrees: number;
        exponent: number;
        enabled: boolean;
        intensity: number;
        color: string;
        className: string;
        uuid: string;
    };
}

/**
 * 半球光对象
 */

declare class MHemisphericLight extends AbstractLight {
    #private;
    className: string;
    getBabylonLight: () => HemisphericLight | void;
    constructor(mitaApp: MitaApp, params?: any);
    onPositionChange: Observable<MHemisphericLight>;
    get position(): Vector3;
    set position(value: Vector3);
    get showDebug(): boolean;
    set showDebug(value: boolean);
    dispose(): void;
    setPosition(position: Vector3): Promise<void>;
    toJSON(): {
        position: Vector3;
        enabled: boolean;
        intensity: number;
        color: string;
        className: string;
        uuid: string;
    };
}

declare const Light_MAP: {
    MDirectionalLight: typeof MDirectionalLight;
    MPointLight: typeof MPointLight;
    MSpotLight: typeof MSpotLight;
    MHemisphericLight: typeof MHemisphericLight;
};
type LightType = keyof typeof Light_MAP;
/**
 * 灯光类，用于管理所有类型灯光，用于切换灯光类型
 */
declare class MLight extends BaseObject {
    #private;
    name: string;
    className: string;
    getMitaApp: () => MitaApp;
    getLight: () => AbstractLight | void;
    get internalLight(): AbstractLight | void;
    set saveLight(light: any);
    /**
     * 灯光类型
     */
    get lightType(): LightType;
    set lightType(type: LightType);
    /**
     * 灯光类型改变事件，灯光类型改变后，灯光实体会自动销毁，重新创建，此事件可捕获新的灯光实体
     */
    onLightTypeChange: Observable<MLight>;
    constructor(mitaApp: MitaApp, params?: any);
    toJSON(): {
        name: string;
        lightType: "MDirectionalLight" | "MPointLight" | "MSpotLight" | "MHemisphericLight";
        saveLight: {
            enabled: boolean;
            intensity: number;
            color: string;
            className: string;
            uuid: string;
        } | undefined;
        className: string;
        uuid: string;
    };
    dispose(): void;
}

/**
 * 灯光管理类
 * babylonjs未支持样式渲染，默认仅支持四个实时光，考虑性能问题，不做修改。
 * 以下为关照系统设计。
 * 若后续需要超多光源，需要开发额外系统，用于管理不限数量光源，建议定义为lightsSystemManager
 * 灯光挂载到MScene上，与env同级，属于环境的一部分
 * 灯光管理类创建四个灯光，默认为1：主光源，2：辅光源，3：辅光源，4：氛围光
 * 灯光不可增加删减，但可开关
 * 每个灯光有light管理，light控制其下真实灯光类型，负责数据接送。
 * 当前light下有四个灯光类型，分别为平行光，点光，聚光，半球光。
 * 具体架构
 * lightManager
 *     light
 *          type
 *          DirectionalLight | PointLight | SpotLight | HemisphereLight /
 */

declare class LightManager extends BaseObject {
    #private;
    className: string;
    get mainLight(): MLight | undefined;
    set mainLight(light: any);
    get fillLightOne(): MLight | undefined;
    set fillLightOne(light: any);
    get fillLightTwo(): MLight | undefined;
    set fillLightTwo(light: any);
    get moodLight(): MLight | undefined;
    set moodLight(light: any);
    getMitaApp: () => MitaApp;
    constructor(mitaApp: MitaApp);
    applySettings(settings: any): void;
    setSettings(settings: any): void;
    getSettings(): {
        mainLight: {
            name: string;
            lightType: "MDirectionalLight" | "MPointLight" | "MSpotLight" | "MHemisphericLight";
            saveLight: {
                enabled: boolean;
                intensity: number;
                color: string;
                className: string;
                uuid: string;
            } | undefined;
            className: string;
            uuid: string;
        } | undefined;
        fillLightOne: {
            name: string;
            lightType: "MDirectionalLight" | "MPointLight" | "MSpotLight" | "MHemisphericLight";
            saveLight: {
                enabled: boolean;
                intensity: number;
                color: string;
                className: string;
                uuid: string;
            } | undefined;
            className: string;
            uuid: string;
        } | undefined;
        fillLightTwo: {
            name: string;
            lightType: "MDirectionalLight" | "MPointLight" | "MSpotLight" | "MHemisphericLight";
            saveLight: {
                enabled: boolean;
                intensity: number;
                color: string;
                className: string;
                uuid: string;
            } | undefined;
            className: string;
            uuid: string;
        } | undefined;
        moodLight: {
            name: string;
            lightType: "MDirectionalLight" | "MPointLight" | "MSpotLight" | "MHemisphericLight";
            saveLight: {
                enabled: boolean;
                intensity: number;
                color: string;
                className: string;
                uuid: string;
            } | undefined;
            className: string;
            uuid: string;
        } | undefined;
        className: string;
        uuid: string;
    };
    toJSON(): {
        mainLight: {
            name: string;
            lightType: "MDirectionalLight" | "MPointLight" | "MSpotLight" | "MHemisphericLight";
            saveLight: {
                enabled: boolean;
                intensity: number;
                color: string;
                className: string;
                uuid: string;
            } | undefined;
            className: string;
            uuid: string;
        } | undefined;
        fillLightOne: {
            name: string;
            lightType: "MDirectionalLight" | "MPointLight" | "MSpotLight" | "MHemisphericLight";
            saveLight: {
                enabled: boolean;
                intensity: number;
                color: string;
                className: string;
                uuid: string;
            } | undefined;
            className: string;
            uuid: string;
        } | undefined;
        fillLightTwo: {
            name: string;
            lightType: "MDirectionalLight" | "MPointLight" | "MSpotLight" | "MHemisphericLight";
            saveLight: {
                enabled: boolean;
                intensity: number;
                color: string;
                className: string;
                uuid: string;
            } | undefined;
            className: string;
            uuid: string;
        } | undefined;
        moodLight: {
            name: string;
            lightType: "MDirectionalLight" | "MPointLight" | "MSpotLight" | "MHemisphericLight";
            saveLight: {
                enabled: boolean;
                intensity: number;
                color: string;
                className: string;
                uuid: string;
            } | undefined;
            className: string;
            uuid: string;
        } | undefined;
        className: string;
        uuid: string;
    };
    dispose(): void;
}

/**
 * 背景类型枚举
 */
declare enum BACK_MODE {
    /**
     * 颜色背景
     */
    COLOR = 0,
    /**
     * 图片背景
     */
    IMAGE = 1,
    /**
     * 天空盒背景
     */
    SKYBOX = 2
}
declare class MScene extends BaseObject {
    #private;
    className: string;
    onEnvTextureChange: Observable<Env>;
    getBabylonScene: () => Scene | null;
    getMitaApp: () => MitaApp;
    /**
     * 背景图片对象
     */
    get backgroundImage(): BackgroundImage;
    set backgroundImage(value: any);
    /**
     * 天空盒对象
     */
    get skybox(): SkyBox;
    set skybox(value: any);
    /**
     * 环境对象
     */
    get env(): Env;
    set env(value: any);
    /**
     * 环境对象
     */
    get lights(): LightManager;
    set lights(value: any);
    /**
     * 背景类型，0：颜色，1：图片，2：天空盒
     */
    get backMode(): BACK_MODE;
    set backMode(value: BACK_MODE);
    onPointerObservable: Observable<PointerInfo>;
    get clearColor(): string;
    set clearColor(value: string);
    get hasBack(): boolean;
    set hasBack(hasBack: boolean);
    get ambientColor(): string;
    set ambientColor(value: string);
    constructor(mitaApp: MitaApp, params?: any);
    private initScene;
    getSettings(): {
        clearColor: string;
        ambientColor: string;
        backgroundImage: {
            enabled: boolean;
            texture: string | undefined;
            className: string;
            uuid: string;
        };
        env: {
            enabled: boolean;
            cubeTexture: string | undefined;
            intensity: number;
            rotationY: number;
            className: string;
            uuid: string;
        };
        skybox: {
            isEnv: boolean;
            blur: number;
            intensity: number;
            enabled: boolean;
            className: string;
            uuid: string;
        };
        lights: {
            mainLight: {
                name: string;
                lightType: "MDirectionalLight" | "MPointLight" | "MSpotLight" | "MHemisphericLight";
                saveLight: {
                    enabled: boolean;
                    intensity: number;
                    color: string;
                    className: string;
                    uuid: string;
                } | undefined;
                className: string;
                uuid: string;
            } | undefined;
            fillLightOne: {
                name: string;
                lightType: "MDirectionalLight" | "MPointLight" | "MSpotLight" | "MHemisphericLight";
                saveLight: {
                    enabled: boolean;
                    intensity: number;
                    color: string;
                    className: string;
                    uuid: string;
                } | undefined;
                className: string;
                uuid: string;
            } | undefined;
            fillLightTwo: {
                name: string;
                lightType: "MDirectionalLight" | "MPointLight" | "MSpotLight" | "MHemisphericLight";
                saveLight: {
                    enabled: boolean;
                    intensity: number;
                    color: string;
                    className: string;
                    uuid: string;
                } | undefined;
                className: string;
                uuid: string;
            } | undefined;
            moodLight: {
                name: string;
                lightType: "MDirectionalLight" | "MPointLight" | "MSpotLight" | "MHemisphericLight";
                saveLight: {
                    enabled: boolean;
                    intensity: number;
                    color: string;
                    className: string;
                    uuid: string;
                } | undefined;
                className: string;
                uuid: string;
            } | undefined;
            className: string;
            uuid: string;
        };
        backMode: BACK_MODE;
        className: string;
        uuid: string;
    };
    setSettings(settings: any): void;
    toJSON(): {
        clearColor: string;
        ambientColor: string;
        backgroundImage: {
            enabled: boolean;
            texture: string | undefined;
            className: string;
            uuid: string;
        };
        env: {
            enabled: boolean;
            cubeTexture: string | undefined;
            intensity: number;
            rotationY: number;
            className: string;
            uuid: string;
        };
        skybox: {
            isEnv: boolean;
            blur: number;
            intensity: number;
            enabled: boolean;
            className: string;
            uuid: string;
        };
        lights: {
            mainLight: {
                name: string;
                lightType: "MDirectionalLight" | "MPointLight" | "MSpotLight" | "MHemisphericLight";
                saveLight: {
                    enabled: boolean;
                    intensity: number;
                    color: string;
                    className: string;
                    uuid: string;
                } | undefined;
                className: string;
                uuid: string;
            } | undefined;
            fillLightOne: {
                name: string;
                lightType: "MDirectionalLight" | "MPointLight" | "MSpotLight" | "MHemisphericLight";
                saveLight: {
                    enabled: boolean;
                    intensity: number;
                    color: string;
                    className: string;
                    uuid: string;
                } | undefined;
                className: string;
                uuid: string;
            } | undefined;
            fillLightTwo: {
                name: string;
                lightType: "MDirectionalLight" | "MPointLight" | "MSpotLight" | "MHemisphericLight";
                saveLight: {
                    enabled: boolean;
                    intensity: number;
                    color: string;
                    className: string;
                    uuid: string;
                } | undefined;
                className: string;
                uuid: string;
            } | undefined;
            moodLight: {
                name: string;
                lightType: "MDirectionalLight" | "MPointLight" | "MSpotLight" | "MHemisphericLight";
                saveLight: {
                    enabled: boolean;
                    intensity: number;
                    color: string;
                    className: string;
                    uuid: string;
                } | undefined;
                className: string;
                uuid: string;
            } | undefined;
            className: string;
            uuid: string;
        };
        backMode: BACK_MODE;
        className: string;
        uuid: string;
    };
    dispose(): void;
    /**
     * 手动创建subSurface refractionIntensity支持实现类 TODO!!
     * @param scene babylonjs Scene
     */
    createTransmissionHelper(): void;
}

declare class TextureContainer extends BaseContainer {
    name: string;
    className: string;
    getAssetContainer: () => AssetContainer | void;
    constructor(mita: MitaApp, params?: any);
    toJSON(): {
        url: string | undefined;
        priority: number;
        name: string;
        className: string;
        uuid: string;
    };
    dispose(): void;
}

declare class CubeTextureContainer extends BaseContainer {
    name: string;
    className: string;
    getAssetContainer: () => AssetContainer | void;
    constructor(mita: MitaApp, params?: any);
    toJSON(): {
        url: string | undefined;
        priority: number;
        name: string;
        className: string;
        uuid: string;
    };
    dispose(): void;
}

declare class AssetManager extends BaseObject {
    className: string;
    containers: any[];
    getMitaApp: () => MitaApp;
    constructor(mita: MitaApp);
    onAddContainer: Observable<BaseContainer>;
    onRemoveContainer: Observable<BaseContainer>;
    onLoadContainer: Observable<BaseContainer>;
    addContainer(container: BaseContainer): BaseContainer;
    /**
     * 私有方法，此管理器为全局资产容器管理器，容器从此处移除仅在容器dispose时发生
     * @param container 移除的容器
     */
    private removeContainer;
    /**
     * 加载模型
     * @param url 模型地址
     * @param name 模型名称
     * @param onProgress 进度回调
     * @returns 返回模型对象
     */
    loadModel(url: string, name: string, onProgress?: (event: ISceneLoaderProgressEvent) => void): ModelContainer | undefined;
    /**
     * 加载纹理
     * @param url 纹理地址
     * @param name 纹理名称
     * @param onProgress 进度回调
     * @returns 返回纹理对象
     */
    loadTexture(url: string, name: string): ModelContainer | TextureContainer | undefined;
    /**
     * 加载正方形纹理
     * @param url 纹理地址
     * @param name 纹理名称
     * @param onProgress 进度回调
     * @returns 返回纹理对象
     */
    loadCubeTexture(url: string, name: string): ModelContainer | CubeTextureContainer | undefined;
    /**
     * 根据UUID获取容器
     * @param UUID 容器唯一标识
     * @returns
     */
    getContainerByUUID(UUID: string): Promise<ModelContainer>;
    /**
     * 获取资产管理器元数据，包含其下所有被引用的资产容器
     * @param sceneObject 场景配置对象，用于剔除未被引用资产
     * @returns
     */
    getSettings(sceneObject: any): {
        containers: any[];
        className: string;
        uuid: string;
    };
    /**
     * 设置资产管理器元数据，恢复元数据中包含的数据
     * @param settings getSettings返回的对象
     * @returns
     */
    setSettings(settings: any): Promise<any[] | undefined>;
    toJSON(): {
        containers: any[];
        className: string;
        uuid: string;
    };
    dispose(): void;
    transferWhiteModelJSONTextureContainers(textures: BaseTexture$1[]): TextureContainer[];
}

declare class Node extends BaseObject {
    className: string;
    children: Node[];
    name: string;
    sourceId: string | number;
    onAddChild: Observable<Node>;
    onRemoveChild: Observable<Node>;
    get parent(): Node | null;
    set parent(parent: Node);
    getParent: () => Node | null;
    setParent(parent: Node | null): Promise<void>;
    toJSON(): {
        name: string;
        sourceId: string | number;
        className: string;
        uuid: string;
    };
    /**
     * 添加子节点
     * @param node Node及其子类实例对象
     */
    addChild(node: Node): void;
    /**
     * 删除子节点
     * @param node Node及其子类实例对象
     */
    removeChild(node: Node): void;
    /**
     * 销毁对象
     */
    dispose(): void;
    protected setParentByUUID(uuid: string): void;
}

interface IAbstractCamera {
    getBabylonCamera: () => Camera | null;
}
declare abstract class AbstractCamera extends Node implements IAbstractCamera {
    #private;
    className: string;
    /**
     * 是否默认相机，请勿修改
     */
    isDefaultCamera: boolean;
    get isActive(): boolean;
    set isActive(isActive: boolean);
    get isAttched(): boolean;
    set isAttched(isAttched: boolean);
    /**
     * 视口，x从左侧起始，y从顶部起始，完整视口为0-1。
     */
    get viewport(): IViewportLike | undefined;
    set viewport(value: IViewportLike);
    /**
     * 相机近裁剪面
     */
    get minZ(): float;
    set minZ(minZ: float);
    /**
     * 相机远裁剪面
     */
    get maxZ(): float;
    set maxZ(maxZ: float);
    /**
     * 相机视场角
     */
    get fov(): float;
    set fov(fov: float);
    getMitaApp: () => MitaApp;
    abstract getBabylonCamera: () => Camera | null;
    onAfterRenderCameraObservable: Observable<AbstractCamera>;
    onBeforeCameraRenderObservable: Observable<AbstractCamera>;
    constructor(mitaApp: MitaApp);
    private attachControl;
    private dettachControl;
    private activeCamera;
    private unActiveCamera;
    toJSON(): {
        isActive: boolean;
        isAttched: boolean;
        minZ: number;
        maxZ: number;
        fov: number;
        viewport: {
            x: number | undefined;
            y: number | undefined;
            width: number | undefined;
            height: number | undefined;
        };
        name: string;
        sourceId: string | number;
        className: string;
        uuid: string;
    };
    dispose(): void;
    private setViewport;
}

declare class CameraManager extends BaseObject {
    className: string;
    cameras: AbstractCamera[];
    onAddCamera: Observable<AbstractCamera>;
    onRemoveCamera: Observable<AbstractCamera>;
    getMitaApp: () => MitaApp;
    constructor(mita: MitaApp);
    addCamera(camera: AbstractCamera): AbstractCamera;
    /**
     *
     * @param camera 移除相机
     */
    removeCamera(camera: AbstractCamera): void;
    getCameraByUUID(uuid: string): Promise<AbstractCamera>;
    getSettings(): {
        cameras: {
            isActive: boolean;
            isAttched: boolean;
            minZ: number;
            maxZ: number;
            fov: number;
            viewport: {
                x: number | undefined;
                y: number | undefined;
                width: number | undefined;
                height: number | undefined;
            };
            name: string;
            sourceId: string | number;
            className: string;
            uuid: string;
        }[];
        className: string;
        uuid: string;
    };
    setSettings(settings: any): void;
    toJSON(): {
        cameras: {
            isActive: boolean;
            isAttched: boolean;
            minZ: number;
            maxZ: number;
            fov: number;
            viewport: {
                x: number | undefined;
                y: number | undefined;
                width: number | undefined;
                height: number | undefined;
            };
            name: string;
            sourceId: string | number;
            className: string;
            uuid: string;
        }[];
        className: string;
        uuid: string;
    };
    /**
     * 切换相机，切换到选中相机，其余相机调整为非活动
     * @param camera
     */
    switchCamera(camera: AbstractCamera): void;
    dispose(): void;
}

declare class MPBRMaterial extends BaseMaterial {
    #private;
    className: string;
    isClone: boolean;
    sourceId: string;
    _modelContainer: BaseContainer | undefined;
    set modelContainer(modelContainer: BaseContainer | string);
    get modelContainer(): BaseContainer | undefined;
    getBabylonMaterial: () => PBRMaterial | void;
    /**
     * 关闭PBR光照。
     */
    get unlit(): boolean;
    set unlit(value: boolean);
    /**
     * 基础颜色
     */
    get albedoColor(): string;
    set albedoColor(value: string);
    /**
     * 基础纹理
     */
    get albedoTexture(): BaseTexture | undefined;
    set albedoTexture(value: BaseTexture | string | null);
    /**
     * 基础色与基础纹理强度 0 - 1
     */
    get baseWeight(): float;
    set baseWeight(value: float);
    /**
     * 金属粗糙纹理
     */
    get metallicTexture(): BaseTexture | undefined;
    set metallicTexture(value: BaseTexture | string | null);
    /**
     * 金属强度
     */
    get metallic(): float;
    set metallic(value: float);
    /**
     * 粗糙强度
     */
    get roughness(): float;
    set roughness(value: float);
    /**
     * F0因数
     */
    get metallicF0Factor(): float;
    set metallicF0Factor(value: float);
    /**
     * 镜面反射纹理
     */
    get metallicReflectanceTexture(): BaseTexture | undefined;
    set metallicReflectanceTexture(value: BaseTexture | string | null);
    /**
     * 镜面反射颜色纹理
     */
    get reflectanceTexture(): BaseTexture | undefined;
    set reflectanceTexture(value: BaseTexture | string | null);
    /**
     * 镜面反射颜色强度，0-1
     */
    get metallicReflectanceColorIntensity(): float;
    set metallicReflectanceColorIntensity(value: float);
    /**
     * 镜面反射颜色
     */
    get metallicReflectanceColor(): string;
    set metallicReflectanceColor(value: string);
    /**
     * 开关法线贴图
     */
    get enabledBumpMap(): boolean;
    set enabledBumpMap(value: boolean);
    /**
     * 法线贴图
     */
    get bumpTexture(): BaseTexture | undefined;
    set bumpTexture(value: BaseTexture | string | null);
    /**
     * 反转绿色通道（-Y）
     */
    get invertNormalMapY(): boolean;
    set invertNormalMapY(value: boolean);
    /**
     * AO贴图（环境光遮蔽）
     */
    get ambientTexture(): BaseTexture | undefined;
    set ambientTexture(value: BaseTexture | string | null);
    /**
     * AO强度
     */
    get ambientTextureStrength(): float;
    set ambientTextureStrength(value: float);
    /**
     * 发光纹理
     */
    get emissiveTexture(): BaseTexture | undefined;
    set emissiveTexture(value: BaseTexture | string | null);
    /**
     * 发光强度
     */
    get emissiveIntensity(): float;
    set emissiveIntensity(value: float);
    /**
     * 发光颜色
     */
    get emissiveColor(): string;
    set emissiveColor(value: string);
    /**
     * 环境光强度
     */
    get environmentIntensity(): float;
    set environmentIntensity(value: float);
    /**
     * 透明度阈值
     */
    get alphaCutOff(): float;
    set alphaCutOff(value: float);
    /**
     * 保留反射高光
     */
    get useRadianceOverAlpha(): boolean;
    set useRadianceOverAlpha(value: boolean);
    /**
     * 各向异性是否开启
     */
    get anisotropyIsEnabled(): boolean;
    set anisotropyIsEnabled(value: boolean);
    /**
     * 各向异性强度
     */
    get anisotropyIntensity(): float;
    set anisotropyIntensity(value: float);
    /**
     * 各向异性角度，单位为角度
     */
    get anisotropyAngle(): float;
    set anisotropyAngle(value: float);
    /**
     * 各向异性贴图
     */
    get anisotropyTexture(): BaseTexture | undefined;
    set anisotropyTexture(value: BaseTexture | string | null);
    /**
     * 清漆是否开启
     */
    get clearCoatIsEnabled(): boolean;
    set clearCoatIsEnabled(value: boolean);
    /**
     * 是否使用清漆基础纹理的绿色通道作为粗糙度
     */
    get clearCoatUseRoughnessFromMainTexture(): boolean;
    set clearCoatUseRoughnessFromMainTexture(value: boolean);
    /**
     * 是否重映射F0
     */
    get clearCoatRemapF0OnInterfaceChange(): boolean;
    set clearCoatRemapF0OnInterfaceChange(value: boolean);
    /**
     * 清漆强度,float,0-1
     */
    get clearCoatIntensity(): float;
    set clearCoatIntensity(value: float);
    /**
     * 清漆基础纹理
     */
    get clearCoatTexture(): BaseTexture | undefined;
    set clearCoatTexture(value: BaseTexture | string | null);
    /**
     * 清漆粗糙度,float,0-1
     */
    get clearCoatRoughness(): float;
    set clearCoatRoughness(value: float);
    /**
     * 清漆粗糙纹理
     */
    get clearCoatTextureRoughness(): BaseTexture | undefined;
    set clearCoatTextureRoughness(value: BaseTexture | string | null);
    /**
     * 清漆法线纹理
     */
    get clearCoatBumpTexture(): BaseTexture | undefined;
    set clearCoatBumpTexture(value: BaseTexture | string | null);
    /**
     * 是否启用次表面散射半透明
     */
    get subSurfaceIsTranslucencyEnabled(): boolean;
    set subSurfaceIsTranslucencyEnabled(value: boolean);
    /**
     * 次表面散射体积折射率，float,0-3
     */
    get subSurfaceVolumeIndexOfRefraction(): float;
    set subSurfaceVolumeIndexOfRefraction(value: float);
    /**
     * 定义厚度贴图中存储的最小厚度，如果未定义厚度贴图，则此值将用于模拟厚度
     */
    get subSurfaceMinimumThickness(): float;
    set subSurfaceMinimumThickness(value: float);
    /**
     * 定义厚度贴图中存储的最大厚度，如果未定义厚度贴图，则此值将用于模拟厚度
     */
    get subSurfaceMaximumThickness(): float;
    set subSurfaceMaximumThickness(value: float);
    /**
     * 启用后，半透明表面将使用反照率颜色着色（与厚度无关）
     */
    get subSurfaceUseAlbedoToTintTranslucency(): boolean;
    set subSurfaceUseAlbedoToTintTranslucency(value: boolean);
    /**
     * 定义材质的半透明强度。 启用半透明后，这将定义“半透明”的量 将添加到材质的漫反射部分。float，0-1
     */
    get subSurfaceTranslucencyIntensity(): float;
    set subSurfaceTranslucencyIntensity(value: float);
    /**
     * 使用 glTF 使用的通道布局，绿色通道用于厚度，红色通道用于折射强度，alpha通道为半透明强度
     */
    get subSurfaceUseGltfStyleTextures(): boolean;
    set subSurfaceUseGltfStyleTextures(value: boolean);
    /**
     * 存储半透明的强度。如果提供，则它优先于 thicknessTexture + useMaskFromThicknessTexture
     * 蓝色（如果 useGltfStyleTextures = true，则为 alpha）通道是半透明强度。
     */
    get subSurfaceTranslucencyIntensityTexture(): BaseTexture | undefined;
    set subSurfaceTranslucencyIntensityTexture(value: BaseTexture | string | null);
    /**
     * 定义材质的半透明色调。 如果未设置，则将使用色调颜色。
     */
    get subSurfaceTranslucencyColor(): string;
    set subSurfaceTranslucencyColor(value: string);
    /**
     * 将材质的半透明色调颜色定义为纹理。 这与半透明颜色相乘，以增加材质的多样性和真实感。 如果未设置 translucencyColor，则将改用色调颜色。
     */
    get subSurfaceTranslucencyColorTexture(): BaseTexture | undefined;
    set subSurfaceTranslucencyColorTexture(value: BaseTexture | string | null);
    /**
     * 启用次表面散射折射
     */
    get subSurfaceIsRefractionEnabled(): boolean;
    set subSurfaceIsRefractionEnabled(value: boolean);
    /**
     * 启用次表面散射色散
     */
    get subSurfaceIsDispersionEnabled(): boolean;
    set subSurfaceIsDispersionEnabled(value: boolean);
    /**
     * 定义次表面散射色散的强度。 0-5
     */
    get subSurfaceDispersion(): float;
    set subSurfaceDispersion(value: float);
    /**
     * 启用后，将使用反照率颜色着色（与厚度无关）
     */
    get subSurfaceUseAlbedoToTintRefraction(): boolean;
    set subSurfaceUseAlbedoToTintRefraction(value: boolean);
    /**
     * 定义材质的折射强度。 启用折射后，将替换材质的 Diffuse （漫反射） 部分。 强度有助于在漫反射和折射之间过渡。float，0-1
     */
    get subSurfaceRefractionIntensity(): float;
    set subSurfaceRefractionIntensity(value: float);
    /**
     * 存储折射的强度。如果提供，则它优先于 thicknessTexture + useMaskFromThicknessTexture
     * 绿色（如果 useGltfStyleTextures = true，则为红色）通道是折射强度。
     */
    get subSurfaceRefractionIntensityTexture(): BaseTexture | undefined;
    set subSurfaceRefractionIntensityTexture(value: BaseTexture | string | null);
    /**
     * 定义在媒体中找到色调颜色的距离。 这仅用于折射。
     */
    get subSurfaceTintColorAtDistance(): float;
    set subSurfaceTintColorAtDistance(value: float);
    /**
     * 定义材质的体积色调。 这用于半透明和散射。
     */
    get subSurfaceTintColor(): string;
    set subSurfaceTintColor(value: string);
    /**
     * 定义厚度应用作深度体积的度量。
     */
    get subSurfaceUseThicknessAsDepth(): boolean;
    set subSurfaceUseThicknessAsDepth(value: boolean);
    /**
     * 在纹理中存储网格的平均厚度 （纹理线性保持值）。 纹理的红色（如果 useGltfStyleTextures=true，则为绿色）通道应包含重新映射的 0 到 1 之间的厚度。 0 表示 minimumThickness 1 表示 maximumThickness 其他通道可以用作蒙版来改变不同的效果强度。
     */
    get subSurfaceThicknessTexture(): BaseTexture | undefined;
    set subSurfaceThicknessTexture(value: BaseTexture | string | null);
    /**
     * 定义材质的折射率。 0-3
     */
    get indexOfRefraction(): float;
    set indexOfRefraction(value: float);
    /**
     * 启用彩虹效果
     */
    get iridescenceIsEnabled(): boolean;
    set iridescenceIsEnabled(value: boolean);
    /**
     * 彩虹效果强度
     */
    get iridescenceIntensity(): float;
    set iridescenceIntensity(value: float);
    /**
     * 彩虹IOR 0-3
     */
    get iridescenceIndexOfRefraction(): float;
    set iridescenceIndexOfRefraction(value: float);
    /**
     * 彩虹最小厚度 最小为0
     */
    get iridescenceMinimumThickness(): float;
    set iridescenceMinimumThickness(value: float);
    /**
     * 彩虹最大厚度 最小为0
     */
    get iridescenceMaximumThickness(): float;
    set iridescenceMaximumThickness(value: float);
    /**
     * 彩虹基础贴图
     */
    get iridescenceTexture(): BaseTexture | undefined;
    set iridescenceTexture(value: BaseTexture | string | null);
    /**
     * 将彩虹色厚度存储在纹理中（绿色通道）
     */
    get iridescenceThicknessTexture(): BaseTexture | undefined;
    set iridescenceThicknessTexture(value: BaseTexture | string | null);
    /**
     * 反射率颜色
     */
    get reflectivityColor(): string;
    set reflectivityColor(value: string);
    /**
     * 表面微观粗糙度,0-1
     */
    get microSurface(): float;
    set microSurface(value: float);
    /**
     * 反射率纹理， Specular 纹理
     */
    get reflectivityTexture(): BaseTexture | undefined;
    set reflectivityTexture(value: BaseTexture | string | null);
    /**
     * 指定反射率纹理是否在其 Alpha 通道中包含光泽度信息。
     */
    get useMicroSurfaceFromReflectivityMapAlpha(): boolean;
    set useMicroSurfaceFromReflectivityMapAlpha(value: boolean);
    /**
     * 启用光泽层
     */
    get sheenIsEnabled(): boolean;
    set sheenIsEnabled(value: boolean);
    /**
     * 光泽层强度 0-1
     */
    get sheenIntensity(): float;
    set sheenIntensity(value: float);
    /**
     * 光泽层颜色
     */
    get sheenColor(): string;
    set sheenColor(value: string);
    /**
     * 光泽层纹理
     */
    get sheenTexture(): BaseTexture | undefined;
    set sheenTexture(value: BaseTexture | string | null);
    /**
     * 光泽层粗糙度0-1
     */
    get sheenRoughness(): float;
    set sheenRoughness(value: float);
    /**
     * 光泽层纹理
     */
    get sheenTextureRoughness(): BaseTexture | undefined;
    set sheenTextureRoughness(value: BaseTexture | string | null);
    /**
     * 如果为 true，则光泽效果使用反照率缩放技术在基础 BRDF 上方分层。 它允许光泽效果的强度不取决于材料的底色， 使设置和调整效果变得更加容易
     */
    get sheenAlbedoScaling(): boolean;
    set sheenAlbedoScaling(value: boolean);
    /**
     * 指示纹理属性的 Alpha 通道将用于粗糙度。 如果未定义粗糙度（和纹理）属性，则不起作用
     */
    get sheenUseRoughnessFromMainTexture(): boolean;
    set sheenUseRoughnessFromMainTexture(value: boolean);
    /**
     * 指定只应使用 metallicReflectanceTexture 中的 A 通道。 如果为 false，则将同时使用 RGB 和 A 通道
     */
    get useOnlyMetallicFromMetallicReflectanceTexture(): boolean;
    set useOnlyMetallicFromMetallicReflectanceTexture(value: boolean);
    constructor(mita: MitaApp, params?: any);
    toJSON(): {
        isClone: boolean;
        sourceId: string;
        unlit: boolean;
        modelContainer: string | null;
        albedoColor: string;
        albedoTexture: string | undefined;
        metallicTexture: string | undefined;
        metallic: number;
        roughness: number;
        metallicF0Factor: number;
        metallicReflectanceTexture: string | undefined;
        reflectanceTexture: string | undefined;
        metallicReflectanceColorIntensity: number;
        metallicReflectanceColor: string;
        enabledBumpMap: boolean;
        bumpTexture: string | undefined;
        invertNormalMapY: boolean;
        ambientTexture: string | undefined;
        ambientTextureStrength: number;
        emissiveTexture: string | undefined;
        emissiveIntensity: number;
        emissiveColor: string;
        environmentIntensity: number;
        alphaCutOff: number;
        useRadianceOverAlpha: boolean;
        anisotropyIsEnabled: boolean;
        anisotropyIntensity: number;
        anisotropyAngle: number;
        anisotropyTexture: string | undefined;
        clearCoatIsEnabled: boolean;
        clearCoatUseRoughnessFromMainTexture: boolean;
        clearCoatRemapF0OnInterfaceChange: boolean;
        clearCoatIntensity: number;
        clearCoatTexture: string | undefined;
        clearCoatRoughness: number;
        clearCoatTextureRoughness: string | undefined;
        clearCoatBumpTexture: string | undefined;
        subSurfaceIsTranslucencyEnabled: boolean;
        subSurfaceVolumeIndexOfRefraction: number;
        subSurfaceMinimumThickness: number;
        subSurfaceMaximumThickness: number;
        subSurfaceUseAlbedoToTintTranslucency: boolean;
        subSurfaceTranslucencyIntensity: number;
        subSurfaceUseGltfStyleTextures: boolean;
        subSurfaceTranslucencyIntensityTexture: string | undefined;
        subSurfaceTranslucencyColor: string;
        subSurfaceTranslucencyColorTexture: string | undefined;
        subSurfaceIsRefractionEnabled: boolean;
        subSurfaceIsDispersionEnabled: boolean;
        subSurfaceDispersion: number;
        subSurfaceUseAlbedoToTintRefraction: boolean;
        subSurfaceRefractionIntensity: number;
        subSurfaceRefractionIntensityTexture: string | undefined;
        subSurfaceTintColorAtDistance: number;
        subSurfaceTintColor: string;
        subSurfaceUseThicknessAsDepth: boolean;
        subSurfaceThicknessTexture: string | undefined;
        indexOfRefraction: number;
        iridescenceIsEnabled: boolean;
        iridescenceIntensity: number;
        iridescenceIndexOfRefraction: number;
        iridescenceMinimumThickness: number;
        iridescenceMaximumThickness: number;
        iridescenceTexture: string | undefined;
        iridescenceThicknessTexture: string | undefined;
        reflectivityColor: string;
        microSurface: number;
        reflectivityTexture: string | undefined;
        useMicroSurfaceFromReflectivityMapAlpha: boolean;
        sheenIsEnabled: boolean;
        sheenIntensity: number;
        sheenColor: string;
        sheenRoughness: number;
        sheenAlbedoScaling: boolean;
        sheenUseRoughnessFromMainTexture: boolean;
        sheenTexture: string | undefined;
        sheenTextureRoughness: string | undefined;
        useOnlyMetallicFromMetallicReflectanceTexture: boolean;
        name: string;
        transparencyMode: TransparencyMode;
        alpha: number;
        doubleSided: boolean;
        needDepthPrePass: boolean;
        className: string;
        uuid: string;
    };
    createBabylonMaterial(modelContainer: BaseContainer | null): Promise<void>;
    private getModelContainer;
    dispose(): void;
    clone(): MPBRMaterial;
    private setTexture;
    private setTextureByUUID;
    private setAnisotropyTexture;
    private setAnisotropyTextureByUUID;
    private setClearCoatTexture;
    private setClearCoatTextureByUUID;
    private setSubSurfaceTexture;
    private setSubSurfaceTextureByUUID;
    private setIridescenceTexture;
    private setIridescenceTextureByUUID;
    private setSheenTexture;
    private setSheenTextureByUUID;
    /**
     * 读取babylonjs pbrmaterial
     * @param babylonMaterial babylon材质
     */
    private parseBabylonMaterial;
}

declare class MTransformNode extends Node {
    #private;
    className: string;
    positionChange: Observable<Vector3>;
    rotationChange: Observable<Vector3>;
    scalingChange: Observable<Vector3>;
    transformChange: Observable<Node>;
    get position(): Vector3;
    set position(value: Vector3);
    get rotation(): Vector3;
    set rotation(value: Vector3);
    get scaling(): Vector3;
    set scaling(value: Vector3);
    private setPosition;
    private setRotation;
    private setScaling;
    toJSON(): {
        position: {
            x: number;
            y: number;
            z: number;
        };
        rotation: {
            x: number;
            y: number;
            z: number;
        };
        scaling: {
            x: number;
            y: number;
            z: number;
        };
        name: string;
        sourceId: string | number;
        className: string;
        uuid: string;
    };
    protected transformFromBabylonNode(node: TransformNode): void;
}

interface IAbstractNode {
    getBabylonNode: () => TransformNode | null;
}
/**
 * 所有抽象Node实际类抽象类
 */
declare abstract class AbstractNode extends MTransformNode implements IAbstractNode {
    #private;
    /**
     * 用于恢复存储的父节点
     */
    set saveParent(parent: AbstractNode | string | null);
    get enabled(): boolean;
    set enabled(enabled: boolean);
    /**
     * 返回babylonjs的transformNode及其子类，由继承此类的子类实现
     */
    abstract getBabylonNode: () => TransformNode | null;
    getMitaApp: () => MitaApp;
    constructor(mitaApp: MitaApp);
    /**
     * 添加子节点
     * @param node Node及其子类实例对象
     */
    addChild(node: AbstractNode): Promise<void>;
    /**
     * 删除子节点
     * @param node Node及其子类实例对象
     */
    removeChild(node: AbstractNode): void;
    protected setParentByUUID(uuid: string): Promise<void>;
    protected setParentByBabylonNode(babylonNode: any): Promise<void>;
    toJSON(): {
        enabled: boolean;
        saveParent: string | undefined;
        position: {
            x: number;
            y: number;
            z: number;
        };
        rotation: {
            x: number;
            y: number;
            z: number;
        };
        scaling: {
            x: number;
            y: number;
            z: number;
        };
        name: string;
        sourceId: string | number;
        className: string;
        uuid: string;
    };
    dispose(): void;
    protected setRootNodePosition(value: Vector3): void;
    protected setRootNodeRotation(value: Vector3): void;
    protected setRootNodeScaling(value: Vector3): void;
}

declare class MSkeleton extends BaseObject {
    className: string;
    name: string;
    sourceId: string | number;
    getMitaApp: () => MitaApp;
    getModel: () => Model;
    getSkeleton: () => Skeleton | null;
    constructor(mita: MitaApp, params?: any);
    /**
     * 重置骨架姿态为初始姿态
     */
    returnToRest(): void;
    private createSkeleton;
    dispose(): void;
}

declare class MAnimation extends BaseObject {
    #private;
    className: string;
    name: string;
    sourceId: string | number;
    getMitaApp: () => MitaApp;
    getModel: () => Model;
    getAnimationGroup: () => AnimationGroup | null;
    onAnimationGroupEndObservable: Observable<MAnimation>;
    onAnimationFrameChangedObservable: Observable<MAnimation>;
    constructor(mita: MitaApp, params?: any);
    get frame(): float;
    set frame(value: float);
    /**
     * 动画最大帧
     */
    get to(): float;
    /**
     * 开始播放动画
     * @param loop 是否循环
     * @param speedRatio 播放速度
     * @param from 开始帧
     * @param to 结束帧
     * @param isAdditive 是否叠加
     */
    start(loop?: boolean, speedRatio?: float, from?: int, to?: int, isAdditive?: boolean): void;
    /**
     * 结束动画
     * @param skipOnAnimationEnd 是否跳到动画结束
     */
    stop(skipOnAnimationEnd?: boolean): void;
    /**
     * 重置动画
     */
    reset(): void;
    /**
     * 播放动画
     * @param loop 是否循环
     */
    play(loop?: boolean): void;
    /**
     * 暂停动画
     */
    pause(): void;
    private createAnimationGroup;
    dispose(): void;
}

declare class Model extends AbstractNode {
    #private;
    nodes: AbstractNode[];
    skeletons: MSkeleton[];
    animations: MAnimation[];
    className: string;
    getRootNode: () => TransformNode | void;
    getInstantiatedEntries: () => InstantiatedEntries | void;
    set modelContainer(modelContainer: BaseContainer | string);
    get modelContainer(): BaseContainer | undefined;
    set saveNodes(saveNodes: any[]);
    getBabylonNode: () => TransformNode | null;
    constructor(mita: MitaApp, params?: any);
    toJSON(): {
        saveNodes: {
            enabled: boolean;
            saveParent: string | undefined;
            position: {
                x: number;
                y: number;
                z: number;
            };
            rotation: {
                x: number;
                y: number;
                z: number;
            };
            scaling: {
                x: number;
                y: number;
                z: number;
            };
            name: string;
            sourceId: string | number;
            className: string;
            uuid: string;
        }[];
        modelContainer: string | undefined;
        enabled: boolean;
        saveParent: string | undefined;
        position: {
            x: number;
            y: number;
            z: number;
        };
        rotation: {
            x: number;
            y: number;
            z: number;
        };
        scaling: {
            x: number;
            y: number;
            z: number;
        };
        name: string;
        sourceId: string | number;
        className: string;
        uuid: string;
    };
    dispose(): void;
    private getModelContainer;
    private createRootNode;
    private transferSkeletons;
    private transferAnimations;
    private transferNodes;
    private addNodes;
    private addSkeleton;
    private addAnimation;
    /**
     * @param speed 时间，单位秒
     * @returns Promise<void>
     * @description 聚焦模型，以模型包围盒为准
     */
    focus(speed?: float): Promise<void>;
    /**
     *
     * @param timeout 持续时间，单位秒
     *  @description 高亮材质，持续一段时间
     *  @returns Promise<void>
     */
    hightLight(timeout?: float): Promise<void>;
    /**
     * 导出模型glb文件
     */
    exportGLB(): Promise<_babylonjs_serializers_glTF_2_0.GLTFData>;
}

declare class MMorphTarget extends BaseObject {
    className: string;
    name: string;
    sourceId: string | number;
    getMitaApp: () => MitaApp;
    getModel: () => Model;
    getMesh: () => MMesh | null;
    getMorphTarget: () => MorphTarget | null;
    constructor(mita: MitaApp, params?: any);
    private createMorphTarget;
    get influence(): float;
    set influence(value: float);
    dispose(): void;
}

/**
 * 模型树Mesh节点
 */
declare class MMesh extends AbstractNode {
    className: string;
    isClone: boolean;
    morphs: MMorphTarget[];
    _modelContainer: BaseContainer | undefined;
    set modelContainer(modelContainer: BaseContainer | string | null);
    get modelContainer(): BaseContainer | undefined;
    get material(): BaseMaterial | null;
    set material(material: MPBRMaterial | string | null);
    get isVisible(): boolean;
    set isVisible(isVisible: boolean);
    onMaterialChanged: Observable<MPBRMaterial | null>;
    getBabylonNode: () => TransformNode | null;
    private getMorphTargetManager;
    constructor(mita: MitaApp, params?: any);
    getModel: () => Model | void;
    getMesh: () => Mesh$1 | void;
    toJSON(): {
        isVisible: boolean;
        isClone: boolean;
        material: string | undefined;
        modelContainer: string | null;
        enabled: boolean;
        saveParent: string | undefined;
        position: {
            x: number;
            y: number;
            z: number;
        };
        rotation: {
            x: number;
            y: number;
            z: number;
        };
        scaling: {
            x: number;
            y: number;
            z: number;
        };
        name: string;
        sourceId: string | number;
        className: string;
        uuid: string;
    };
    private setMaterial;
    private setMaterialByUUID;
    private createMesh;
    private addMorphTargets;
    private transferMorphTargets;
    private getModelContainer;
    /**
     *
     * @param timeout 持续时间，单位秒
     *  @description 高亮材质，持续一段时间
     *  @returns Promise<void>
     */
    hightLight(timeout?: float): Promise<void>;
    /**
     * @param speed 时间，单位秒
     * @returns Promise<void>
     * @description 聚焦mesh，以mesh包围盒为准
     */
    focus(speed?: float): Promise<void>;
    dispose(): void;
}

/**
 * 需设计相机 viewport 与切换主相机方案。
 */
declare class MArcRotateCamera extends AbstractCamera {
    #private;
    className: string;
    name: string;
    targetChange: Observable<Vector3>;
    get target(): Vector3;
    set target(value: Vector3);
    get alpha(): float;
    set alpha(alpha: float);
    get beta(): float;
    set beta(beta: float);
    get radius(): float;
    set radius(radius: float);
    get wheelDeltaPercentage(): float;
    set wheelDeltaPercentage(wheelDeltaPercentage: float);
    get lowerRadiusLimit(): float;
    set lowerRadiusLimit(lowerRadiusLimit: float);
    get upperRadiusLimit(): float;
    set upperRadiusLimit(upperRadiusLimit: float);
    get autoPanningSensibility(): boolean;
    set autoPanningSensibility(autoPanningSensibility: boolean);
    getBabylonCamera: () => Camera | null;
    constructor(mitaApp: MitaApp, params?: any);
    private initCamera;
    toJSON(): {
        target: {
            x: number;
            y: number;
            z: number;
        };
        alpha: number;
        beta: number;
        radius: number;
        wheelDeltaPercentage: number;
        lowerRadiusLimit: number;
        upperRadiusLimit: number;
        isActive: boolean;
        isAttched: boolean;
        minZ: number;
        maxZ: number;
        fov: number;
        viewport: {
            x: number | undefined;
            y: number | undefined;
            width: number | undefined;
            height: number | undefined;
        };
        name: string;
        sourceId: string | number;
        className: string;
        uuid: string;
    };
    private setTarget;
    /**
     * @param boundingInfo 包围盒
     * @param speed 时间，单位秒
     * @returns Promise<void>
     * @description 飞行到指定的包围盒，包围盒中心点为
     */
    flyToBoundingBox(boundingInfo: BoundingBox, speed?: float): Promise<void>;
    /**
     * @param meshes MMesh集合
     * @param speed 时间，单位秒
     * @returns Promise<void>
     * @description 飞行到指定的mesh集合，包围盒中心点为
     */
    flyToMeshs(meshes: MMesh[], speed?: float): Promise<void>;
    /**
     * @param model 模型对象
     * @param speed 时间，单位秒
     * @returns Promise<void>
     * @description 飞行到指定的model，包围盒中心点为
     */
    flyToModel(model: Model, speed?: float): Promise<void>;
    clone(): MArcRotateCamera;
}

declare class MaterialManager extends BaseObject {
    className: string;
    materials: BaseMaterial[];
    onAddMaterial: Observable<BaseMaterial>;
    onRemoveMaterial: Observable<BaseMaterial>;
    getMitaApp: () => MitaApp;
    constructor(mita: MitaApp);
    getMaterialByUUID(uuid: string): Promise<BaseMaterial>;
    addMaterial(material: BaseMaterial): BaseMaterial;
    /**
     * 私有方法，此管理器为全局材质管理器，材质从此处移除仅在材质dispose时发生
     * @param material 移除的材质
     */
    private removeMaterial;
    getSettings(): {
        materials: {
            name: string;
            transparencyMode: TransparencyMode;
            alpha: number;
            doubleSided: boolean;
            needDepthPrePass: boolean;
            className: string;
            uuid: string;
        }[];
        className: string;
        uuid: string;
    };
    setSettings(settings: any): void;
    /**
     * 使用材质配置json创建一个材质
     * @param materialSetting getMaterialSetting 返回的材质配置中的 material字段
     * @returns 新生成的材质
     */
    setMaterialSetting(m: any): void;
    toJSON(): {
        materials: {
            name: string;
            transparencyMode: TransparencyMode;
            alpha: number;
            doubleSided: boolean;
            needDepthPrePass: boolean;
            className: string;
            uuid: string;
        }[];
        className: string;
        uuid: string;
    };
    /**
     * 转换AssetContainer材质
     * @param container 资产容器
     */
    transferModelContainerMaterials(modelContainer: ModelContainer): Promise<unknown>;
    transferWhiteModelJSONMaterials(materials: PBRMaterial[]): Promise<void>;
    /**
     * 清理冗余材质
     */
    clearRedundantMaterials(): void;
    dispose(): void;
}

declare class ModelManager extends BaseObject {
    className: string;
    models: Model[];
    onAddModel: Observable<Model>;
    onRemoveModel: Observable<Model>;
    getMitaApp: () => MitaApp;
    constructor(mita: MitaApp);
    addModel(model: Model): Model;
    /**
     * 私有方法，此管理器为全局模型管理器，模型从此处移除仅在模型dispose时发生
     * @param model 移除的模型
     */
    private removeModel;
    getSettings(): {
        models: {
            saveNodes: {
                enabled: boolean;
                saveParent: string | undefined;
                position: {
                    x: number;
                    y: number;
                    z: number;
                };
                rotation: {
                    x: number;
                    y: number;
                    z: number;
                };
                scaling: {
                    x: number;
                    y: number;
                    z: number;
                };
                name: string;
                sourceId: string | number;
                className: string;
                uuid: string;
            }[];
            modelContainer: string | undefined;
            enabled: boolean;
            saveParent: string | undefined;
            position: {
                x: number;
                y: number;
                z: number;
            };
            rotation: {
                x: number;
                y: number;
                z: number;
            };
            scaling: {
                x: number;
                y: number;
                z: number;
            };
            name: string;
            sourceId: string | number;
            className: string;
            uuid: string;
        }[];
        className: string;
        uuid: string;
    };
    setSettings(settings: any): void;
    toJSON(): {
        models: {
            saveNodes: {
                enabled: boolean;
                saveParent: string | undefined;
                position: {
                    x: number;
                    y: number;
                    z: number;
                };
                rotation: {
                    x: number;
                    y: number;
                    z: number;
                };
                scaling: {
                    x: number;
                    y: number;
                    z: number;
                };
                name: string;
                sourceId: string | number;
                className: string;
                uuid: string;
            }[];
            modelContainer: string | undefined;
            enabled: boolean;
            saveParent: string | undefined;
            position: {
                x: number;
                y: number;
                z: number;
            };
            rotation: {
                x: number;
                y: number;
                z: number;
            };
            scaling: {
                x: number;
                y: number;
                z: number;
            };
            name: string;
            sourceId: string | number;
            className: string;
            uuid: string;
        }[];
        className: string;
        uuid: string;
    };
    dispose(): void;
}

/**
 * 所有Node类统一管理器，用于管理查询Node
 */

declare class NodeManager extends BaseObject {
    className: string;
    nodes: AbstractNode[];
    onAddNode: Observable<AbstractNode>;
    onRemoveNode: Observable<AbstractNode>;
    getMitaApp: () => MitaApp;
    constructor(mita: MitaApp);
    addNode(node: AbstractNode): AbstractNode;
    /**
     * 私有方法，此管理器为全局模型管理器，模型从此处移除仅在模型dispose时发生
     * @param node 移除的模型
     */
    private removeNode;
    getNodeByUUID(uuid: string): Promise<AbstractNode>;
    getNodeByBabylonNode(babylonNode: any): Promise<AbstractNode>;
    toJSON(): {
        className: string;
        uuid: string;
    };
}

declare class SSAOPipeline extends BaseObject {
    #private;
    className: string;
    cameras: AbstractCamera[];
    onAddCamera: Observable<AbstractCamera>;
    onRemoveCamera: Observable<AbstractCamera>;
    getBabylonPipeline: () => SSAORenderingPipeline | void;
    getMitaApp: () => MitaApp;
    /**
     * 启用SSAO后处理效果
     */
    get enabled(): boolean;
    set enabled(value: boolean);
    /**
     * 强度 0-2
     */
    get factor(): float;
    set factor(value: float);
    /**
     * SSAO半径 0.00001-0.00100
     */
    get radius(): float;
    set radius(value: float);
    /**
     * SSAO基本强度 0-1
     */
    get base(): float;
    set base(value: float);
    /**
     * SSAO采样区域大小 0.0001-0.0100
     */
    get area(): float;
    set area(value: float);
    /**
     * SSAO衰减速率 0.000000 - 0.000010
     */
    get fallOff(): float;
    set fallOff(value: float);
    set saveCameras(cameras: any);
    constructor(mitaApp: MitaApp);
    /**
     * 添加相机到postProcess管理器
     * @param camera  相机
     */
    addCamera(camera: AbstractCamera): Promise<void>;
    /**
     * 从postProcess管理器移除相机
     * @param camera  相机
     */
    removeCamera(camera: AbstractCamera): Promise<void>;
    toJSON(): {
        enabled: boolean;
        saveCameras: string[];
        factor: number;
        radius: number;
        base: number;
        area: number;
        fallOff: number;
        className: string;
        uuid: string;
    };
    getSeetings(): {
        enabled: boolean;
        saveCameras: string[];
        factor: number;
        radius: number;
        base: number;
        area: number;
        fallOff: number;
        className: string;
        uuid: string;
    };
    setSettings(settings: any): void;
    dispose(): void;
}

declare class BloomPipeline extends BaseObject {
    #private;
    className: string;
    getBabylonPipeline: () => DefaultRenderingPipeline | void;
    getMitaApp: () => MitaApp;
    /**
     * 启用泛光
     */
    get enabled(): boolean;
    set enabled(value: boolean);
    /**
     * 泛光强度 0-2
     */
    get factor(): float;
    set factor(value: float);
    /**
     * 泛光阈值 0-1
     */
    get threshold(): float;
    set threshold(value: float);
    constructor(mitaApp: MitaApp, babylonPipeline?: DefaultRenderingPipeline);
    toJSON(): {
        enabled: boolean;
        factor: number;
        threshold: number;
        className: string;
        uuid: string;
    };
    getSettings(): {
        enabled: boolean;
        factor: number;
        threshold: number;
        className: string;
        uuid: string;
    };
    setSettings(settings: any): Promise<void>;
    dispose(): void;
}

/**
 * 渐晕后处理效果对象
 */
declare class VignettePipeline extends BaseObject {
    #private;
    className: string;
    getBabylonPipeline: () => ImageProcessingPostProcess | void;
    getMitaApp: () => MitaApp;
    /**
     * 启用渐晕
     */
    get enabled(): boolean;
    set enabled(value: boolean);
    /**
     * 渐晕强度 0-5
     */
    get factor(): float;
    set factor(value: float);
    /**
     * 渐晕视场角，0-180之间
     */
    get vignetteCameraFov(): float;
    set vignetteCameraFov(value: float);
    /**
     * 渐晕颜色
     */
    get vignetteColor(): string;
    set vignetteColor(value: string);
    constructor(mitaApp: MitaApp, babylonPipeline?: ImageProcessingPostProcess);
    toJSON(): {
        enabled: boolean;
        factor: number;
        vignetteCameraFov: number;
        vignetteColor: string;
        className: string;
        uuid: string;
    };
    getSettings(): {
        enabled: boolean;
        factor: number;
        vignetteCameraFov: number;
        vignetteColor: string;
        className: string;
        uuid: string;
    };
    setSettings(settings: any): Promise<void>;
    dispose(): void;
}

declare class SharpenPipeline extends BaseObject {
    #private;
    className: string;
    getBabylonPipeline: () => DefaultRenderingPipeline | void;
    getMitaApp: () => MitaApp;
    /**
     * 启用锐化
     */
    get enabled(): boolean;
    set enabled(value: boolean);
    /**
     * 边缘强度 0-5
     */
    get edgeAmount(): float;
    set edgeAmount(value: float);
    /**
     * 颜色对比度 0-1
     */
    get colorAmount(): float;
    set colorAmount(value: float);
    constructor(mitaApp: MitaApp, babylonPipeline?: DefaultRenderingPipeline);
    toJSON(): {
        enabled: boolean;
        edgeAmount: number;
        colorAmount: number;
        className: string;
        uuid: string;
    };
    getSettings(): {
        enabled: boolean;
        edgeAmount: number;
        colorAmount: number;
        className: string;
        uuid: string;
    };
    setSettings(settings: any): Promise<void>;
    dispose(): void;
}

declare class TAAPipeline extends BaseObject {
    #private;
    className: string;
    cameras: AbstractCamera[];
    onAddCamera: Observable<AbstractCamera>;
    onRemoveCamera: Observable<AbstractCamera>;
    getBabylonPipeline: () => TAARenderingPipeline | void;
    getMitaApp: () => MitaApp;
    /**
     * 启用TAA效果
     */
    get enabled(): boolean;
    set enabled(value: boolean);
    /**
     * 混合因子 建议 0-0.5
     */
    get factor(): float;
    set factor(value: float);
    /**
     *  累计样本数 1-32 int类型
     */
    get samples(): int;
    set samples(value: int);
    set saveCameras(cameras: any);
    constructor(mitaApp: MitaApp);
    /**
     * 添加相机到postProcess管理器
     * @param camera  相机
     */
    addCamera(camera: AbstractCamera): Promise<void>;
    /**
     * 从postProcess管理器移除相机
     * @param camera  相机
     */
    removeCamera(camera: AbstractCamera): Promise<void>;
    toJSON(): {
        enabled: boolean;
        saveCameras: string[];
        factor: number;
        samples: number;
        className: string;
        uuid: string;
    };
    getSeetings(): {
        enabled: boolean;
        saveCameras: string[];
        factor: number;
        samples: number;
        className: string;
        uuid: string;
    };
    setSettings(settings: any): void;
    dispose(): void;
}

/**
 * 颗粒效果后处理
 */
declare class GrainPipeline extends BaseObject {
    #private;
    className: string;
    getBabylonPipeline: () => DefaultRenderingPipeline | void;
    getMitaApp: () => MitaApp;
    /**
     * 启用颗粒
     */
    get enabled(): boolean;
    set enabled(value: boolean);
    /**
     * 颗粒强度 0-50
     */
    get intensity(): float;
    set intensity(value: float);
    /**
     * 动画
     */
    get animated(): boolean;
    set animated(value: boolean);
    constructor(mitaApp: MitaApp, babylonPipeline?: DefaultRenderingPipeline);
    toJSON(): {
        enabled: boolean;
        intensity: number;
        animated: boolean;
        className: string;
        uuid: string;
    };
    getSettings(): {
        enabled: boolean;
        intensity: number;
        animated: boolean;
        className: string;
        uuid: string;
    };
    setSettings(settings: any): Promise<void>;
    dispose(): void;
}

/**
 * 景深后处理效果
 */
declare class DepthOfField extends BaseObject {
    #private;
    className: string;
    getBabylonPipeline: () => DefaultRenderingPipeline | void;
    getMitaApp: () => MitaApp;
    /**
     * 启用景深
     */
    get enabled(): boolean;
    set enabled(value: boolean);
    /**
     * 光圈大小，建议0-8；
     */
    get fStop(): float;
    set fStop(value: float);
    /**
     * 虚化强度，建议 0-128；
     */
    get lensSize(): int;
    set lensSize(value: int);
    constructor(mitaApp: MitaApp, babylonPipeline?: DefaultRenderingPipeline);
    toJSON(): {
        enabled: boolean;
        fStop: number;
        lensSize: number;
        className: string;
        uuid: string;
    };
    getSettings(): {
        enabled: boolean;
        fStop: number;
        lensSize: number;
        className: string;
        uuid: string;
    };
    setSettings(settings: any): Promise<void>;
    dispose(): void;
}

declare class MSAAPipeline extends BaseObject {
    #private;
    className: string;
    getBabylonPipeline: () => DefaultRenderingPipeline | void;
    getMitaApp: () => MitaApp;
    /**
     * 启用多重采样抗锯齿（MSAA）
     */
    get enabled(): boolean;
    set enabled(value: boolean);
    /**
     * 多重采样倍数 1-8
     */
    get samples(): int;
    set samples(value: int);
    constructor(mitaApp: MitaApp, babylonPipeline?: DefaultRenderingPipeline);
    toJSON(): {
        enabled: boolean;
        samples: number;
        className: string;
        uuid: string;
    };
    getSettings(): {
        enabled: boolean;
        samples: number;
        className: string;
        uuid: string;
    };
    setSettings(settings: any): Promise<void>;
    dispose(): void;
}

/**
 * 后期处理管理类
 * 该类负责管理后期处理的开启和关闭，参数调整
 * 泛光效果，来自 DefaultRenderingPipeline ，bloom相关字段
 * 快速近似抗锯齿（FXAA），来自 DefaultRenderingPipeline ，可直接从 DefaultRenderingPipeline.fxaaEnabled 设置
 * 景深效果，来自 DefaultRenderingPipeline ， depthOfField相关字段
 * 渐晕效果，来自 ImageProcessingPostProcess ，可直接从 DefaultRenderingPipeline.imageProcessing 获取
 * 颗粒效果，来自 GrainPostProcess ，可直接从 DefaultRenderingPipeline.grain 获取
 * 锐化效果，来自 SharpenPostProcess ，可直接从 DefaultRenderingPipeline.sharpen 获取
 * 屏幕控件环境光遮蔽效果，来自 SSAORenderingPipeline 需手动创建。
 * 时间性抗锯齿（TAA）， 来自 TAARenderingPipeline 需手动创建。
 */

declare class PostProcessManager extends BaseObject {
    #private;
    className: string;
    cameras: AbstractCamera[];
    onAddCamera: Observable<AbstractCamera>;
    onRemoveCamera: Observable<AbstractCamera>;
    getMitaApp: () => MitaApp;
    getDefaultRenderingPipeline: () => DefaultRenderingPipeline | void;
    getBloomPipeline: () => BloomPipeline | void;
    getVignettePipeline: () => VignettePipeline | void;
    getSharpenPipeline: () => SharpenPipeline | void;
    getGrainPipeline: () => GrainPipeline | void;
    getDepthOfField: () => DepthOfField | void;
    getSSAOPipeline: () => SSAOPipeline | void;
    getTAAPipeline: () => TAAPipeline | void;
    getMSAAPipeline: () => MSAAPipeline | void;
    constructor(mitaApp: MitaApp);
    /**
     * 是否开启后期处理
     */
    get enabled(): boolean;
    set enabled(value: boolean);
    /**
     * 是否开启快速近似抗锯齿（fxaa）
     */
    get fxaaEnabled(): boolean;
    set fxaaEnabled(value: boolean);
    /**
     * 泛光后处理管理对象
     */
    get bloomPipeline(): void | BloomPipeline;
    /**
     * 多重采样抗锯齿后处理
     */
    get msaaPipeline(): void | MSAAPipeline;
    /**
     * 屏幕空间环境光遮蔽管理对象
     */
    get ssaoPipeline(): void | SSAOPipeline;
    /**
     * 渐晕后处理管理对象
     */
    get vignettePipeline(): void | VignettePipeline;
    /**
     * 颗粒后处理管理对象
     */
    get grainPipeline(): void | GrainPipeline;
    /**
     * 景深后处理管理对象
     */
    get depthOfField(): void | DepthOfField;
    /**
     * 锐化后处理管理对象
     */
    get sharpenPipeline(): void | SharpenPipeline;
    /**
     * TAA后期处理管理对象
     */
    get taaPipeline(): void | TAAPipeline;
    /**
     * 用于恢复camera引用
     */
    private set saveCameras(value);
    /**
     * 用于恢复SSAO后期处理参数
     */
    private set saveSSAOPipeline(value);
    private set saveBloomPipeline(value);
    private set saveVignettePipeline(value);
    private set saveSharpenPipeline(value);
    private set saveTAAPipeline(value);
    private set saveGrainPipeline(value);
    private set saveDepthOfField(value);
    private set saveMSAAPipeline(value);
    /**
     * 缓存销毁回调，用于销毁其下挂载的所有对象
     */
    disposeCachesCallback: Function[];
    /**
     * 返回后期处理参数
     * @returns 返回后期处理参数
     */
    getSettings(): {
        enabled: boolean;
        fxaaEnabled: boolean;
        saveCameras: string[];
        saveSSAOPipeline: {
            enabled: boolean;
            saveCameras: string[];
            factor: number;
            radius: number;
            base: number;
            area: number;
            fallOff: number;
            className: string;
            uuid: string;
        } | undefined;
        saveBloomPipeline: {
            enabled: boolean;
            factor: number;
            threshold: number;
            className: string;
            uuid: string;
        } | undefined;
        saveMSAAPipeline: {
            enabled: boolean;
            samples: number;
            className: string;
            uuid: string;
        } | undefined;
        saveVignettePipeline: {
            enabled: boolean;
            factor: number;
            vignetteCameraFov: number;
            vignetteColor: string;
            className: string;
            uuid: string;
        } | undefined;
        saveGrainPipeline: {
            enabled: boolean;
            intensity: number;
            animated: boolean;
            className: string;
            uuid: string;
        } | undefined;
        saveDepthOfField: {
            enabled: boolean;
            fStop: number;
            lensSize: number;
            className: string;
            uuid: string;
        } | undefined;
        saveSharpenPipeline: {
            enabled: boolean;
            edgeAmount: number;
            colorAmount: number;
            className: string;
            uuid: string;
        } | undefined;
        saveTAAPipeline: {
            enabled: boolean;
            saveCameras: string[];
            factor: number;
            samples: number;
            className: string;
            uuid: string;
        } | undefined;
        className: string;
        uuid: string;
    };
    /**
     * 设置后期处理参数
     * @param settings 后期处理参数
     */
    setSettings(settings: any): void;
    /**
     * 返回后期处理序列化元数据
     * @returns  返回后期处理序列化元数据
     */
    toJSON(): {
        enabled: boolean;
        fxaaEnabled: boolean;
        saveCameras: string[];
        saveSSAOPipeline: {
            enabled: boolean;
            saveCameras: string[];
            factor: number;
            radius: number;
            base: number;
            area: number;
            fallOff: number;
            className: string;
            uuid: string;
        } | undefined;
        saveBloomPipeline: {
            enabled: boolean;
            factor: number;
            threshold: number;
            className: string;
            uuid: string;
        } | undefined;
        saveMSAAPipeline: {
            enabled: boolean;
            samples: number;
            className: string;
            uuid: string;
        } | undefined;
        saveVignettePipeline: {
            enabled: boolean;
            factor: number;
            vignetteCameraFov: number;
            vignetteColor: string;
            className: string;
            uuid: string;
        } | undefined;
        saveGrainPipeline: {
            enabled: boolean;
            intensity: number;
            animated: boolean;
            className: string;
            uuid: string;
        } | undefined;
        saveDepthOfField: {
            enabled: boolean;
            fStop: number;
            lensSize: number;
            className: string;
            uuid: string;
        } | undefined;
        saveSharpenPipeline: {
            enabled: boolean;
            edgeAmount: number;
            colorAmount: number;
            className: string;
            uuid: string;
        } | undefined;
        saveTAAPipeline: {
            enabled: boolean;
            saveCameras: string[];
            factor: number;
            samples: number;
            className: string;
            uuid: string;
        } | undefined;
        className: string;
        uuid: string;
    };
    dispose(): void;
    /**
     * 添加相机到postProcess管理器
     * @param camera  相机
     */
    addCamera(camera: AbstractCamera): Promise<void>;
    /**
     * 从postProcess管理器移除相机
     * @param camera  相机
     */
    removeCamera(camera: AbstractCamera): Promise<void>;
}

declare class TextureManager extends BaseObject {
    className: string;
    textures: BaseTexture[];
    getMitaApp: () => MitaApp;
    onAddTexture: Observable<BaseTexture>;
    onRemoveTexture: Observable<BaseTexture>;
    constructor(mita: MitaApp);
    getTextureByUUID(uuid: string): Promise<BaseTexture>;
    addTexture(texture: BaseTexture): BaseTexture;
    /**
     * 私有方法，此管理器为全局纹理管理器，纹理移除仅在纹理dispose时发生
     * @param texture 移除的纹理
     */
    private removeTexture;
    getSettings(): {
        textures: {
            name: string;
            isClone: boolean;
            level: number;
            channel: UVChannel;
            url: string | undefined;
            className: string;
            uuid: string;
        }[];
        className: string;
        uuid: string;
    };
    setSettings(settings: any): void;
    toJSON(): {
        textures: {
            name: string;
            isClone: boolean;
            level: number;
            channel: UVChannel;
            url: string | undefined;
            className: string;
            uuid: string;
        }[];
        className: string;
        uuid: string;
    };
    /**
     * 转换AssetContainer纹理
     * @param container 资产容器
     */
    transferModelContainerTextures(container: BaseContainer): Promise<unknown>;
    transferWhiteModelJSONTextures(textureContainers: TextureContainer[]): Promise<void>;
    /**
     * 清理冗余纹理,建议先清理冗余材质，再清理冗余纹理。
     */
    clearRedundantTextures(): void;
    dispose(): void;
}

/**
 * Promise 并发队列
 * @param maxConcurrent 最大并发数（默认 1）
 */
declare class PromiseQueue {
    private maxConcurrent;
    private running;
    private queue;
    constructor(maxConcurrent?: int);
    /**
     * 添加任务到队列
     * @param task 返回 Promise 的函数
     * @returns 包含任务结果的 Promise
     */
    add<T>(task: () => Promise<T>): Promise<T>;
    /**
     * 执行队列中的下一个任务
     */
    private executeNext;
    /**
     * 获取当前运行中的任务数
     */
    get runningCount(): int;
    /**
     * 获取等待中的任务数
     */
    get pendingCount(): int;
    dispose(): void;
}

/**
 * MitaApp 引擎入口类
 */
declare class MitaApp extends BaseObject {
    className: string;
    /**
     * promise队列管理器，默认最大并发为1
     */
    promiseQueue: PromiseQueue;
    /**
     * 节点管理器
     */
    nodeManager: NodeManager;
    /**
     * 资产管理器
     */
    assetManager: AssetManager;
    /**
     * 纹理管理器
     */
    textureManager: TextureManager;
    /**
     * 材质管理器
     */
    materialManager: MaterialManager;
    /**
     * 模型管理器
     */
    modelManager: ModelManager;
    /**
     * 相机管理器
     */
    cameraManager: CameraManager;
    /**
     * 后期处理管理器
     */
    postProcessManager: PostProcessManager;
    /**
     *  获取canvas元素
     */
    getCanvas: () => HTMLCanvasElement;
    /**
     * 获取babylonjs engine对象
     */
    getEngine: () => Engine | void;
    /**
     * 获取mita scene对象
     */
    getMitaScene: () => MScene | void;
    get mitaScene(): MScene;
    /**
     * 获取babylonjs scene对象
     */
    getScene: () => Scene | void;
    /**
     * 获取默认mita相机对象
     */
    getDefaultMitaCamera: () => MArcRotateCamera | void;
    /**
     * 获取默认babylonjs 相机对象
     */
    getDeafultCamera: () => ArcRotateCamera | void;
    /**
     * engine就绪事件
     */
    onEngineReady: Observable<MitaApp>;
    /**
     *  scene就绪事件
     */
    onSceneReady: Observable<MitaApp>;
    /**
     *  默认相机就绪事件
     */
    onDefaultCameraReady: Observable<MitaApp>;
    /**
     * 鼠标事件代理事件
     */
    onPointerObservable: Observable<PointerInfo>;
    /**
     * 渲染完成事件
     */
    onAfterRenderObservable: Observable<MitaApp>;
    /**
     * 渲染开始事件
     */
    onBeforeRenderObservable: Observable<MitaApp>;
    /**
     * 引擎就绪后执行
     * @returns
     */
    engineReadyNext(): Promise<void>;
    /**
     * 场景就绪后执行
     * @returns
     */
    sceneReadyNext(): Promise<void>;
    /**
     * 默认相机就绪后执行
     * @returns
     */
    defaultCameraReadyNext(): Promise<void>;
    /**
     * 在指定帧数后执行
     * @param frame 要延后的帧数
     * @returns
     */
    renderNext(frame?: int): Promise<void>;
    constructor(container: HTMLCanvasElement);
    init(): Promise<void>;
    initEngine(): Promise<void>;
    initScene(): Promise<void>;
    initCamera(): Promise<void>;
    /**
     * 加载模型
     * @param url 模型地址
     * @param name 模型名称
     * @param onProgress 进度回调
     * @returns 返回模型对象
     */
    addModel(url: string, name: string, onProgress?: (event: ISceneLoaderProgressEvent) => void): Promise<Model>;
    /**
     * 加载模型
     * @param url 模型地址
     * @param materialJSON 材质配置文件，节选自gltf文件
     * @param name 模型名称
     * @param onProgress 进度回调
     * @returns 返回模型对象
     */
    addWhiteModelWithMaterialJSON(url: string, materialJSON: any, name: string, onProgress?: (event: ISceneLoaderProgressEvent) => void): Promise<Model>;
    /**
     * 加载纹理
     * @param url 纹理地址
     * @param name 纹理名称
     * @returns 纹理对象
     */
    loadTexture(url: string, name: string): Promise<BaseTexture>;
    /**
     * 获取当前场景配置
     * @returns  返回当前应用的设置文件
     */
    getSettings(): File;
    /**
     * 设置当前场景配置
     * @param settings  设置文件
     */
    setSettings(settings: File): Promise<void>;
    /**
     * 获取当前场景配置JSON
     * @returns  返回当前应用的JSON表示形式
     */
    toJSON(): {
        scene: {
            clearColor: string;
            ambientColor: string;
            backgroundImage: {
                enabled: boolean;
                texture: string | undefined;
                className: string;
                uuid: string;
            };
            env: {
                enabled: boolean;
                cubeTexture: string | undefined;
                intensity: number;
                rotationY: number;
                className: string;
                uuid: string;
            };
            skybox: {
                isEnv: boolean;
                blur: number;
                intensity: number;
                enabled: boolean;
                className: string;
                uuid: string;
            };
            lights: {
                mainLight: {
                    name: string;
                    lightType: "MDirectionalLight" | "MPointLight" | "MSpotLight" | "MHemisphericLight";
                    saveLight: {
                        enabled: boolean;
                        intensity: number;
                        color: string;
                        className: string;
                        uuid: string;
                    } | undefined;
                    className: string;
                    uuid: string;
                } | undefined;
                fillLightOne: {
                    name: string;
                    lightType: "MDirectionalLight" | "MPointLight" | "MSpotLight" | "MHemisphericLight";
                    saveLight: {
                        enabled: boolean;
                        intensity: number;
                        color: string;
                        className: string;
                        uuid: string;
                    } | undefined;
                    className: string;
                    uuid: string;
                } | undefined;
                fillLightTwo: {
                    name: string;
                    lightType: "MDirectionalLight" | "MPointLight" | "MSpotLight" | "MHemisphericLight";
                    saveLight: {
                        enabled: boolean;
                        intensity: number;
                        color: string;
                        className: string;
                        uuid: string;
                    } | undefined;
                    className: string;
                    uuid: string;
                } | undefined;
                moodLight: {
                    name: string;
                    lightType: "MDirectionalLight" | "MPointLight" | "MSpotLight" | "MHemisphericLight";
                    saveLight: {
                        enabled: boolean;
                        intensity: number;
                        color: string;
                        className: string;
                        uuid: string;
                    } | undefined;
                    className: string;
                    uuid: string;
                } | undefined;
                className: string;
                uuid: string;
            };
            backMode: BACK_MODE;
            className: string;
            uuid: string;
        } | undefined;
        defaultCamera: {
            target: {
                x: number;
                y: number;
                z: number;
            };
            alpha: number;
            beta: number;
            radius: number;
            wheelDeltaPercentage: number;
            lowerRadiusLimit: number;
            upperRadiusLimit: number;
            isActive: boolean;
            isAttched: boolean;
            minZ: number;
            maxZ: number;
            fov: number;
            viewport: {
                x: number | undefined;
                y: number | undefined;
                width: number | undefined;
                height: number | undefined;
            };
            name: string;
            sourceId: string | number;
            className: string;
            uuid: string;
        } | undefined;
        modelManager: {
            models: {
                saveNodes: {
                    enabled: boolean;
                    saveParent: string | undefined;
                    position: {
                        x: number;
                        y: number;
                        z: number;
                    };
                    rotation: {
                        x: number;
                        y: number;
                        z: number;
                    };
                    scaling: {
                        x: number;
                        y: number;
                        z: number;
                    };
                    name: string;
                    sourceId: string | number;
                    className: string;
                    uuid: string;
                }[];
                modelContainer: string | undefined;
                enabled: boolean;
                saveParent: string | undefined;
                position: {
                    x: number;
                    y: number;
                    z: number;
                };
                rotation: {
                    x: number;
                    y: number;
                    z: number;
                };
                scaling: {
                    x: number;
                    y: number;
                    z: number;
                };
                name: string;
                sourceId: string | number;
                className: string;
                uuid: string;
            }[];
            className: string;
            uuid: string;
        };
        materialManager: {
            materials: {
                name: string;
                transparencyMode: TransparencyMode;
                alpha: number;
                doubleSided: boolean;
                needDepthPrePass: boolean;
                className: string;
                uuid: string;
            }[];
            className: string;
            uuid: string;
        };
        cameraManager: {
            cameras: {
                isActive: boolean;
                isAttched: boolean;
                minZ: number;
                maxZ: number;
                fov: number;
                viewport: {
                    x: number | undefined;
                    y: number | undefined;
                    width: number | undefined;
                    height: number | undefined;
                };
                name: string;
                sourceId: string | number;
                className: string;
                uuid: string;
            }[];
            className: string;
            uuid: string;
        };
        postProcessManager: {
            enabled: boolean;
            fxaaEnabled: boolean;
            saveCameras: string[];
            saveSSAOPipeline: {
                enabled: boolean;
                saveCameras: string[];
                factor: number;
                radius: number;
                base: number;
                area: number;
                fallOff: number;
                className: string;
                uuid: string;
            } | undefined;
            saveBloomPipeline: {
                enabled: boolean;
                factor: number;
                threshold: number;
                className: string;
                uuid: string;
            } | undefined;
            saveMSAAPipeline: {
                enabled: boolean;
                samples: number;
                className: string;
                uuid: string;
            } | undefined;
            saveVignettePipeline: {
                enabled: boolean;
                factor: number;
                vignetteCameraFov: number;
                vignetteColor: string;
                className: string;
                uuid: string;
            } | undefined;
            saveGrainPipeline: {
                enabled: boolean;
                intensity: number;
                animated: boolean;
                className: string;
                uuid: string;
            } | undefined;
            saveDepthOfField: {
                enabled: boolean;
                fStop: number;
                lensSize: number;
                className: string;
                uuid: string;
            } | undefined;
            saveSharpenPipeline: {
                enabled: boolean;
                edgeAmount: number;
                colorAmount: number;
                className: string;
                uuid: string;
            } | undefined;
            saveTAAPipeline: {
                enabled: boolean;
                saveCameras: string[];
                factor: number;
                samples: number;
                className: string;
                uuid: string;
            } | undefined;
            className: string;
            uuid: string;
        };
        textureManager: {};
        assetManager: {};
        className: string;
        uuid: string;
        asset: {
            generator: string;
            version: string;
        };
    };
    private applyDefaultCameraParams;
    resize(): void;
    /**
     * 销毁MitaApp。
     */
    dispose(): void;
    /**
     * 获取传入材质配置
     * @param material mita 材质对象
     * @returns 材质配置JSON
     */
    getMaterialSetting(material: BaseMaterial): File;
    /**
     * 使用材质配置json创建一个材质
     * @param materialSetting getMaterialSetting 返回的材质配置
     * @returns 新生成的材质
     */
    setMaterialSetting(materialSetting: File): Promise<void>;
}

declare global {
    interface Window {
        observer: any[];
    }
}
declare function createUILayer(container: HTMLElement, mita: MitaApp): Promise<Pane>;

declare module '@babylonjs/core/Materials/Textures/baseTexture' {
    interface BaseTexture {
        /**
         * 拓展接口，获取绑定的Mita Texture的方法，方便从babylonTexture获取Mita Texture;
         * @returns { MBaseTexture } MitaMaterial
         */
        getMitaTexture?: () => BaseTexture;
    }
}

declare module '@babylonjs/core/Node' {
    interface Node {
        getMitaNode?: () => Node | null;
        getMitaModel?: () => Node | null;
    }
}

declare module '@babylonjs/core/Materials/material' {
    interface Material {
        /**
         * 拓展接口，获取绑定的Mita Material的方法，方便从babylonMaterial获取Mita Material;
         * @returns { BaseMaterial } MitaMaterial
         */
        getMitaMaterial?: () => BaseMaterial;
    }
}

export { MitaApp, createUILayer };
