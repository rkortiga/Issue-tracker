using IssuesApp.Server.Models;
using IssuesApp.Server.Models.Dto;

namespace IssuesApp.Server.Service;

public interface IIssueService
{
	Task<IEnumerable<Issue>> GetAllIssuesAsync();
	
	Task<Issue> GetIssueByIdAsync(int id);
	
	Task<Issue> CreateIssueAsync(CreateIssueDto issue);
	
	Task<Issue> UpdateIssueAsync(UpdateIssueDto issue);
	
	Task<Boolean> DeleteIssueAsync(int id);
}