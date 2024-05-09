import { fetchQuery } from "convex/nextjs";
import { api } from "convex/_generated/api";
/**
 * Asynchronously retrieves the active team associated with a specified user ID. This function
 * calls a server-side API using the `fetchQuery` method, passing the user's ID as an argument
 * to query for the user's active team. It assumes that the API method `getUserActiveTeamWithServer`
 * is correctly set up to respond to this query.
 *
 * @async
 * @param {string} userId - The unique identifier of the user whose active team is being retrieved.
 * @returns {Promise<Object>} A promise that resolves to the active team object associated with the user.
 *
 * @example
 * async function displayUserTeam(userId) {
 *   try {
 *     const team = await getUserActiveTeam(userId);
 *     console.log('Active team:', team);
 *   } catch (error) {
 *     console.error('Failed to retrieve active team:', error);
 *   }
 * }
 */
async function getUserActiveTeam(userId: string) {
  const activeTeam = await fetchQuery(api.user.getUserActiveTeamWithServer, {
    userId: userId,
  });
  return activeTeam;
}
/**
 * Asynchronously retrieves detailed information about the active team associated with a specific user ID.
 * This function utilizes a predefined API call (`getActiveTeamInfoWithServer`) to fetch this information
 * from the server. The user's ID is passed as a parameter to ensure that the correct team information
 * is retrieved. This function is useful for applications needing to display or process team-specific data
 * in user contexts.
 *
 * @async
 * @param {string} userId - The unique identifier of the user whose active team information is being retrieved.
 * @returns {Promise<Object>} A promise that resolves to an object containing the active team information for the user.
 *
 * @example
 * async function displayActiveTeamInfo(userId) {
 *   try {
 *     const teamInfo = await getUserActiveTeamInfo(userId);
 *     console.log('Active Team Info:', teamInfo);
 *   } catch (error) {
 *     console.error('Failed to retrieve active team information:', error);
 *   }
 * }
 */
async function getUserActiveTeamInfo(userId: string) {
  const team = await fetchQuery(api.team.getActiveTeamInfoWithServer, {
    userId: userId,
  });
  return team;
}

export { getUserActiveTeam, getUserActiveTeamInfo };
