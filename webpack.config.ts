import path from 'path';
import webpack from 'webpack';
import { buildWebpack } from './config/buildProject/buildWebpack';
import { BuildMode, BuildPaths } from './config/buildProject/types/types';

interface EnvVariables {
    mode?: BuildMode;
    port?: number;
    analyzer?: boolean; 
}

export default (env: EnvVariables) => {

    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        public: path.resolve(__dirname, 'public'),
        output: path.resolve(__dirname, 'build'),
        src: path.resolve(__dirname, 'src'),
    }

    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        analyzer: env.analyzer,
        paths,
    });
    return config;
};