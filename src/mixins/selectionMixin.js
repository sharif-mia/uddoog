export default {
  data() {
    return {
      selectAll: false,
      selectedRows: [],
    };
  },
  methods: {
    toggleSelectAll(items) {
      this.selectAll = !this.selectAll;
      this.selectedRows = this.selectAll ? items.map((item) => item.id) : [];
    },
    handleRowSelect(items) {
      this.selectAll = this.selectedRows.length === items.length;
    },
    resetSelection() {
      this.selectAll = false;
      this.selectedRows = [];
    },
  },
};
