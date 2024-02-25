/* eslint-disable */
import { readdir, rename } from "node:fs/promises";
import { fileURLToPath } from "node:url";

async function fix(directory_path)
{
	try
	{
		const content = await readdir(directory_path, { withFileTypes: true });

		for (const item of content)
		{
			if (!item.isDirectory() && !item.isFile())
			{
				continue;
			}

			if (item.isDirectory())
			{
				await fix(`${directory_path}/${item.name}`);
			}

			if (/[A-Z]/.test(item.name))
			{
				const new_name = item.name.replaceAll(/([^A-Z])([A-Z])/g, "$1-$2").toLowerCase().replace(".test.mts", ".spec.mts");

				try
				{
					await rename(`${directory_path}/${item.name}`, `${directory_path}/${new_name}`);
				}
				catch (error)
				{
					throw new Error(`${directory_path}/${item.name} -> ${directory_path}/${new_name}`, { cause: error });
				}
			}
			else if (item.name.endsWith(".test.mts"))
			{
				const new_name = item.name.replace(".test.mts", ".spec.mts");

				try
				{
					await rename(`${directory_path}/${item.name}`, `${directory_path}/${new_name}`);
				}
				catch (error)
				{
					throw new Error(`${directory_path}/${item.name} -> ${directory_path}/${new_name}`, { cause: error });
				}
			}
		}
	}
	catch (error)
	{
		throw new Error(directory_path, { cause: error });
	}
}

fix(fileURLToPath(import.meta.resolve("./packages/testing-ground/src")));
fix(fileURLToPath(import.meta.resolve("./packages/ts-predicate/src")));
fix(fileURLToPath(import.meta.resolve("./packages/ts-predicate/test")));
fix(fileURLToPath(import.meta.resolve("./packages/mockingbird/src")));
fix(fileURLToPath(import.meta.resolve("./packages/mockingbird/test")));

/* eslint-enable */
