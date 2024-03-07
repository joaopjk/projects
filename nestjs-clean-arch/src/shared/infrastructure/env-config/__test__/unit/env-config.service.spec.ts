import {Test, TestingModule} from '@nestjs/testing';
import {EnvConfigService} from '../../env-config.service';
import {EnvConfigModule} from "@/shared/infrastructure/env-config/env-config.module";
import {isNumber} from "@nestjs/common/utils/shared.utils";

describe('EnvConfigService unit tests', () => {
    let sut: EnvConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [EnvConfigModule.forRoot()],
            providers: [EnvConfigService],
        }).compile();

        sut = module.get<EnvConfigService>(EnvConfigService);
    });

    it('should be defined', () => {
        expect(sut).toBeDefined();
    });

    it('should return the variable PORT', () => {
        const port = sut.getAppPort()
        expect(port).toBe(3000)
    });

    it('should return the variable NODE_ENV', () => {
        expect(sut.getNodeEnv()).toBe("test")
    });
});
