using IssuesApp.Server.Models;

namespace IssuesApp.Server.Repository
{
	public interface IIssueRepository
	{
		Task<IEnumerable<Issue>> GetAllIssuesAsync();

		Task<Issue> GetIssueByIdAsync(int id);

		Task<Issue> AddIssueAsync(Issue issue);

		Task<Issue> UpdateIssueAsync(Issue issue);

		Task<bool> DeleteIssueAsync(int id);
	}
}
