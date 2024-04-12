export const delay = async (time = 5000) => {
  await new Promise((resolve) => setTimeout(resolve, time))
}
