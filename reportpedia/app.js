const reports = [
  {
    id: 'KNR1001',
    title: 'Monitoring Penerimaan Iuran Via Cabang',
    tags: ['Kepesertaan', 'PU', 'Iuran'],
    icon: 'icon.svg',
    bookmarked: false
  },
  {
    id: 'KNR1002',
    title: 'Rekap Iuran Belum Rinci Cabang',
    tags: ['Kepesertaan', 'TK', 'Pembayaran'],
    icon: 'icon.svg',
    bookmarked: false
  },
  {
    id: 'KNR1003',
    title: 'Kertas Kerja Posting Iuran',
    tags: ['Iuran', 'Posting', 'Keuangan'],
    icon: 'icon.svg',
    bookmarked: false
  },
  {
    id: 'KNR1004',
    title: 'Laporan Kepesertaan Aktif',
    tags: ['Kepesertaan', 'Aktif', 'Laporan'],
    icon: 'icon.svg',
    bookmarked: false
  },
  {
    id: 'KNR1005',
    title: 'Rekapitulasi Pembayaran TK',
    tags: ['TK', 'Pembayaran', 'Rekapitulasi'],
    icon: 'icon.svg',
    bookmarked: false
  },
  {
    id: 'KNR1006',
    title: 'Analisis Klaim JHT',
    tags: ['Klaim', 'JHT', 'Analisis'],
    icon: 'icon.svg',
    bookmarked: false
  },
  {
    id: 'KNR1007',
    title: 'Laporan Realisasi Investasi',
    tags: ['Investasi', 'Realisasi', 'Keuangan'],
    icon: 'icon.svg',
    bookmarked: false
  },
  {
    id: 'KNR1008',
    title: 'Daftar Peserta Baru',
    tags: ['Kepesertaan', 'Peserta Baru', 'Registrasi'],
    icon: 'icon.svg',
    bookmarked: false
  },
  {
    id: 'KNR1009',
    title: 'Rekapitulasi Mutasi Dana',
    tags: ['Mutasi', 'Dana', 'Rekapitulasi'],
    icon: 'icon.svg',
    bookmarked: false
  },
  {
    id: 'KNR1010',
    title: 'Laporan Kinerja Cabang',
    tags: ['Kinerja', 'Cabang', 'Laporan'],
    icon: 'icon.svg',
    bookmarked: false
  },
  {
    id: 'KNR1011',
    title: 'Statistik Kecelakaan Kerja',
    tags: ['Statistik', 'Kecelakaan', 'K3'],
    icon: 'icon.svg',
    bookmarked: false
  },
  {
    id: 'KNR1012',
    title: 'Laporan Penyaluran Manfaat',
    tags: ['Penyaluran', 'Manfaat', 'Laporan'],
    icon: 'icon.svg',
    bookmarked: false
  },
  {
    id: 'KNR1013',
    title: 'Monitoring Pembayaran Jaminan Pensiun',
    tags: ['Monitoring', 'Pembayaran', 'JP'],
    icon: 'icon.svg',
    bookmarked: false
  },
  {
    id: 'KNR1014',
    title: 'Rekapitulasi Data Perusahaan',
    tags: ['Rekapitulasi', 'Perusahaan', 'Data'],
    icon: 'icon.svg',
    bookmarked: false
  },
  {
    id: 'KNR1015',
    title: 'Analisis Kepesertaan Sektor Informal',
    tags: ['Analisis', 'Kepesertaan', 'Sektor Informal'],
    icon: 'icon.svg',
    bookmarked: false
  }
];

let searchKeywords = [];
let currentMenu = 'report'; // 'report' or 'favorite'

// Pagination state
let currentPage = 1;
const pageSize = 5;

function renderTags() {
  const tagsContainer = document.querySelector('.tags');
  tagsContainer.innerHTML = '';
  searchKeywords.forEach((keyword, idx) => {
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.innerHTML = `${keyword} <button class="remove-tag" data-idx="${idx}">×</button>`;
    tagsContainer.appendChild(tag);
  });
  // Add remove event
  document.querySelectorAll('.remove-tag').forEach(btn => {
    btn.onclick = function() {
      const idx = parseInt(this.getAttribute('data-idx'));
      searchKeywords.splice(idx, 1);
      renderTags();
      renderReports(getSearchFilters()); // Trigger search after tag removed
    };
  });
}

function renderDetailReportModal(report) {
  const modal = document.getElementById('detailReportModal');
  const form = document.getElementById('detailReportForm');
  // Field periode lebarnya disamakan dengan field kantor (tidak terlalu panjang)
  form.innerHTML = `
    <h2 style="font-size:1.3rem;margin:0 0 1.2rem 0;font-weight:600;color:#2d3a4a;letter-spacing:1px;text-align:left;background:none;">Cetak ${report.title}</h2>
    <div style="display:flex;flex-wrap:wrap;gap:24px 32px;align-items:center;">
      <div style="flex:1 1 180px;min-width:160px;max-width:260px;">
        <label for="periode" style="font-weight:600;display:block;margin-bottom:6px;">Periode *</label>
        <input type="date" id="periode" name="periode" value="${new Date().toISOString().slice(0,10)}" style="width:100%;max-width:260px;padding:8px 12px;border-radius:8px;border:1px solid #b3c6e6;font-size:1rem;cursor:pointer;">
      </div>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:24px 32px;align-items:center;margin-top:18px;">
      <div style="flex:1 1 260px;min-width:220px;">
        <label for="kantor" style="font-weight:600;display:block;margin-bottom:6px;">Kantor *</label>
        <div style="display:flex;align-items:center;gap:8px;">
          <input type="text" id="kantor" name="kantor" value="J0P" readonly style="width:60px;padding:8px 8px;border-radius:8px 0 0 8px;border:1px solid #b3c6e6;font-size:1rem;background:#e6eaf0;">
          <input type="text" value="GRHA BPJAMSOSTEK" readonly style="flex:1;padding:8px 12px;border-radius:0 8px 8px 0;border:1px solid #b3c6e6;border-left:none;font-size:1rem;background:#e6eaf0;">
          <span title="Info" style="display:inline-block;width:22px;height:22px;background:#e0eafc;border-radius:50%;text-align:center;line-height:22px;color:#3bb2f6;font-weight:bold;font-size:1.1rem;cursor:pointer;">?</span>
        </div>
      </div>
      <div style="flex:1 1 180px;min-width:160px;display:flex;align-items:center;gap:8px;margin-top:24px;">
        <input type="checkbox" id="showParam" name="showParam" style="width:18px;height:18px;">
        <label for="showParam" style="font-weight:600;">Show Parameter</label>
      </div>
    </div>
    <div style="display:flex;gap:18px;margin-top:32px;justify-content:flex-start;">
      <button type="button" style="background:#3bb2f6;color:#fff;font-weight:700;border:none;border-radius:8px;padding:10px 28px;font-size:1rem;box-shadow:0 2px 8px rgba(44,62,80,0.10);cursor:pointer;">CETAK LAPORAN</button>
      <button type="button" style="background:#3bb2f6;color:#fff;font-weight:700;border:none;border-radius:8px;padding:10px 28px;font-size:1rem;box-shadow:0 2px 8px rgba(44,62,80,0.10);cursor:pointer;">CETAK LAPORAN EXCEL</button>
    </div>
  `;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function closeDetailReportModal() {
  const modal = document.getElementById('detailReportModal');
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

document.getElementById('closeDetailReportModal').onclick = closeDetailReportModal;
document.getElementById('detailReportModal').onclick = function(e) {
  if (e.target === this) closeDetailReportModal();
};

function renderPagination(total, onPageChange) {
  const totalPages = Math.ceil(total / pageSize);
  const container = document.getElementById('paginationContainer');
  if (!container) return;
  container.innerHTML = '';
  if (totalPages <= 1) return;
  // Prev button
  const prevBtn = document.createElement('button');
  prevBtn.textContent = '‹';
  prevBtn.className = 'pagination-btn pagination-prev';
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      onPageChange();
    }
  };
  container.appendChild(prevBtn);
  // Numbered buttons
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = 'pagination-btn' + (i === currentPage ? ' active' : '');
    btn.onclick = () => {
      currentPage = i;
      onPageChange();
    };
    container.appendChild(btn);
  }
  // Next button
  const nextBtn = document.createElement('button');
  nextBtn.textContent = '›';
  nextBtn.className = 'pagination-btn pagination-next';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      onPageChange();
    }
  };
  container.appendChild(nextBtn);
}

function getSearchFilters() {
  // Ambil semua tag pencarian (multiple search)
  return searchKeywords.map(k => k.trim()).filter(k => k.length > 0);
}

function renderReports(filter = '') {
  const reportsList = document.getElementById('reportsList');
  reportsList.innerHTML = '';
  let filters = [];
  if (typeof filter === 'string') {
    filters = filter.split(',').map(f => f.trim()).filter(f => f.length > 0);
  } else if (Array.isArray(filter)) {
    filters = filter;
  }
  let data = reports;
  if (currentMenu === 'favorite') {
    data = reports.filter(r => r.bookmarked);
  }
  // Multiple search: semua keyword harus match di title atau tags
  data = data.filter(r => {
    if (filters.length === 0) return true;
    return filters.every(f => {
      const keyword = f.toLowerCase();
      return (
        r.title.toLowerCase().includes(keyword) ||
        r.tags.some(tag => tag.toLowerCase().includes(keyword))
      );
    });
  });
  // Pagination logic
  const startIdx = (currentPage - 1) * pageSize;
  const pagedData = data.slice(startIdx, startIdx + pageSize);
  pagedData.forEach(report => {
    const card = document.createElement('div');
    card.className = 'report-card';
    const shuffledTags = [...report.tags].sort(() => Math.random() - 0.5);
    card.innerHTML = `
      <div class="report-id">${report.id}</div>
      <div class="report-title">${report.title}</div>
      <div class="report-tags">
        ${shuffledTags.map((tag, i) => i === 0 ? `<span class=\"report-tag\"><img src=\"${report.icon}\" class=\"report-icon\" alt=\"icon\"> ${tag}</span>` : `<span class=\"report-tag\">${tag}</span>`).join('')}
      </div>
      <span class="bookmark${report.bookmarked ? ' active' : ''}" title="${report.bookmarked ? 'Hapus dari Favorit' : 'Tambah ke Favorit'}">${report.bookmarked ? '★' : '☆'}</span>
      <button class="view-report-btn" data-title="${report.title}">VIEW</button>
    `;
    // Perbaiki event favorit agar update dan render ulang menu favorit
    card.querySelector('.bookmark').onclick = (e) => {
      e.stopPropagation();
      report.bookmarked = !report.bookmarked;
      renderReports(getSearchFilters());
      // Jika sedang di menu favorite, pastikan update tampilan
      if (currentMenu === 'favorite') {
        renderReports(getSearchFilters());
      }
    };
    card.querySelector('.view-report-btn').onclick = function() {
      renderDetailReportModal(report);
    };
    reportsList.appendChild(card);
  });
  renderPagination(data.length, () => renderReports(getSearchFilters()));
}

// Tambahkan container pagination ke index.html jika belum ada
if (!document.getElementById('paginationContainer')) {
  const pagDiv = document.createElement('div');
  pagDiv.id = 'paginationContainer';
  pagDiv.className = 'pagination-container';
  const reportsList = document.getElementById('reportsList');
  reportsList.parentNode.insertBefore(pagDiv, reportsList.nextSibling);
}

// Sidebar menu event
const menuReport = document.getElementById('menu-report');
const menuFavorite = document.getElementById('menu-favorite');
const reportsSection = document.getElementById('reportsList');
const headerSearchWrapper = document.querySelector('.header-search-wrapper');
const searchSection = document.querySelector('.search-section');

menuReport.onclick = function() {
  currentMenu = 'report';
  menuReport.classList.add('active');
  menuFavorite.classList.remove('active');
  reportsSection.style.display = 'block';
  headerSearchWrapper.style.display = 'block';
  searchSection.style.display = 'flex';
  renderReports(getSearchFilters());
};
menuFavorite.onclick = function() {
  currentMenu = 'favorite';
  menuFavorite.classList.add('active');
  menuReport.classList.remove('active');
  reportsSection.style.display = 'block';
  headerSearchWrapper.style.display = 'block';
  searchSection.style.display = 'none';
  renderReports(getSearchFilters());
};

// Sidebar hide/show logic
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebarShow = document.getElementById('sidebar-show');
const sidebarArrow = document.getElementById('sidebar-arrow');
const sidebarShowArrow = document.getElementById('sidebar-show-arrow');
const container = document.querySelector('.container');

sidebarToggle.onclick = function() {
  sidebar.classList.add('hide');
  sidebarShow.style.display = 'block';
  container.style.marginLeft = '0';
  sidebarArrow.innerHTML = '&#8592;'; // left arrow (hidden state, but for consistency)
  sidebarShowArrow.innerHTML = '&#8594;'; // right arrow
};
sidebarShow.onclick = function() {
  sidebar.classList.remove('hide');
  sidebarShow.style.display = 'none';
  container.style.marginLeft = '230px';
  sidebarArrow.innerHTML = '&#8592;'; // left arrow
  sidebarShowArrow.innerHTML = '&#8594;'; // right arrow
};

// Ubah arah panah saat sidebar di-hide/tampil
const observer = new MutationObserver(() => {
  if (sidebar.classList.contains('hide')) {
    sidebarArrow.innerHTML = '&#8592;'; // left arrow (sidebar tertutup)
    sidebarShowArrow.innerHTML = '&#8594;'; // right arrow (untuk show)
  } else {
    sidebarArrow.innerHTML = '&#8592;'; // left arrow (sidebar terbuka)
    sidebarShowArrow.innerHTML = '&#8594;'; // right arrow
  }
});
observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });

// Initial render
renderTags();
renderReports();

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keyup', function(e) {
  if (e.key === 'Enter') {
    const val = searchInput.value.trim();
    if (val && !searchKeywords.includes(val)) {
      searchKeywords.push(val);
      renderTags();
    }
    searchInput.value = '';
    renderReports(getSearchFilters()); // Tambahkan ini agar search langsung jalan
  }
});

document.querySelector('.search-btn').onclick = function(e) {
  e.preventDefault();
  const val = searchInput.value.trim();
  if (val && !searchKeywords.includes(val)) {
    searchKeywords.push(val);
    renderTags();
    searchInput.value = '';
  }
  renderReports(getSearchFilters());
};
