function dummyDependency(input)
{
	return input.replaceAll(/\D/g, "");
}

export { dummyDependency };

export default dummyDependency;
