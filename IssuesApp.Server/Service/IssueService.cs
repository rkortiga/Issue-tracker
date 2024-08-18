using IssuesApp.Server.Models;
using IssuesApp.Server.Models.Dto;

namespace IssuesApp.Server.Service;

public class IssueService : IIssueService
{
	public async Task<IEnumerable<Issue>> GetAllIssuesAsync()
	{
		throw new NotImplementedException();
	}

	public async Task<Issue> GetIssueByIdAsync(int id)
	{
		throw new NotImplementedException();
	}

	public async Task<Issue> CreateIssueAsync(CreateIssueDto issue)
	{
		throw new NotImplementedException();
	}

	public async Task<Issue> UpdateIssueAsync(UpdateIssueDto issue)
	{
		throw new NotImplementedException();
	}

	public async Task<Boolean> DeleteIssueAsync(int id)
	{
		throw new NotImplementedException();
	}
}