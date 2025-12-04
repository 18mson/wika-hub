import { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';
import { generateTransactions } from '../data/mockData';

const ITEMS_PER_PAGE = 10;

export default function TransactionsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const transactions = useMemo(() => generateTransactions(), []);

  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  const totalBalance = transactions[0]?.balance || 0;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'credit':
        return <TrendingUp size={20} className="text-green-600" />;
      case 'charge':
        return <TrendingDown size={20} className="text-red-600" />;
      case 'payment':
        return <TrendingDown size={20} className="text-orange-600" />;
      default:
        return <DollarSign size={20} className="text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'credit':
        return 'text-green-600';
      case 'charge':
        return 'text-red-600';
      case 'payment':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTypeBg = (type: string) => {
    switch (type) {
      case 'credit':
        return 'bg-green-50';
      case 'charge':
        return 'bg-red-50';
      case 'payment':
        return 'bg-orange-50';
      default:
        return 'bg-gray-50';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">Completed</span>;
      case 'pending':
        return <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">Pending</span>;
      case 'failed':
        return <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-medium">Failed</span>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="pb-6 px-4 max-w-lg mx-auto">
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg mb-6">
        <p className="text-sm text-blue-100 mb-2">Current Balance</p>
        <p className="text-4xl font-bold mb-1">Rp {totalBalance.toLocaleString()}</p>
        <p className="text-xs text-blue-100">Available for charging</p>

        <button className="mt-4 w-full bg-white text-blue-600 py-3 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors">
          Top Up Credit
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">Transaction History</h2>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {transactions.length} total
        </span>
      </div>

      <div className="space-y-2 mb-6">
        {currentTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`p-2 rounded-lg ${getTypeBg(transaction.type)}`}>
                    {getTypeIcon(transaction.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800 text-sm capitalize">
                        {transaction.type}
                      </h3>
                      {getStatusBadge(transaction.status)}
                    </div>
                    <p className="text-xs text-gray-500 truncate">{transaction.location}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatDate(transaction.date)} • {formatTime(transaction.date)}
                    </p>
                  </div>
                </div>
                <div className="text-right ml-3">
                  <p className={`text-lg font-bold ${getTypeColor(transaction.type)}`}>
                    {transaction.amount > 0 ? '+' : ''}
                    {transaction.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">ID: {transaction.id}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} />
            <span className="text-sm font-medium">Prev</span>
          </button>

          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span className="text-sm font-medium">Next</span>
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-1 flex-wrap">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && goToPage(page)}
              disabled={page === '...'}
              className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-colors ${
                page === currentPage
                  ? 'bg-blue-600 text-white'
                  : page === '...'
                  ? 'cursor-default text-gray-400'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-500 text-center mt-3">
          Showing {startIndex + 1}-{Math.min(endIndex, transactions.length)} of {transactions.length} transactions
        </p>
      </div>
    </div>
  );
}
