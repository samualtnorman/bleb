import babelPresetEnv from "@babel/preset-env"
import babelPresetTypescript from "@babel/preset-typescript"
import { babel } from "@rollup/plugin-babel"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import terser from "@rollup/plugin-terser"
import { findFiles } from "@samual/lib/findFiles"
import babelPluginHere from "babel-plugin-here"
import { readFile } from "fs/promises"

const SOURCE_FOLDER = "src"
const MINIFY = true

/** @type {() => Promise<import("rollup").RollupOptions>} */
export default async () => {
	const [ foundFiles, packageJsonString ] =
		await Promise.all([ findFiles(SOURCE_FOLDER), readFile("package.json", { encoding: "utf8" }) ])

	const packageJson = JSON.parse(packageJsonString)

	const externalDependencies = [
		..."dependencies" in packageJson ? Object.keys(packageJson.dependencies) : [],
		..."optionalDependencies" in packageJson ? Object.keys(packageJson.optionalDependencies) : []
	]

	return {
		input: Object.fromEntries(
			foundFiles.filter(path => path.endsWith(".ts") && !path.endsWith(".d.ts"))
				.map(path => [ path.slice(SOURCE_FOLDER.length + 1, -3), path ])
		),
		output: { dir: "dist", generatedCode: "es2015", compact: MINIFY },
		plugins: [
			babel({
				babelHelpers: "bundled",
				extensions: [ ".ts" ],
				presets: [
					[ babelPresetEnv, { targets: { node: "20" } } ],
					[ babelPresetTypescript, { allowDeclareFields: true } ]
				],
				plugins: [ babelPluginHere() ]
			}),
			nodeResolve({ extensions: [ ".ts" ] }),
			MINIFY && terser({ keep_classnames: true, keep_fnames: true })
		],
		external: source =>
			externalDependencies.some(dependency => source == dependency || source.startsWith(`${dependency}/`)),
		strictDeprecations: true
	}
}
