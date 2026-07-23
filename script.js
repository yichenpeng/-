// 初始化垂直拖拉排序 (SortableJS)
document.addEventListener('DOMContentLoaded', () => {
    Sortable.create(stationList, {
        animation: 150,          // 拖拉放開時的滑順動畫 (毫秒)
        handle: '.drag-handle',  // 只能拉左邊的 "☰" 圖示，或者整行都可以拉（拿掉這行即可）
        direction: 'vertical',   // 嚴格限制只能垂直移動！
        onEnd: function (evt) {
            // 當拖拉結束時，重新對調陣列順序
            const oldIndex = evt.oldIndex;
            const newIndex = evt.newIndex;

            if (oldIndex === newIndex) return;

            // 調整陣列
            const movedItem = stations.splice(oldIndex, 1)[0];
            stations.splice(newIndex, 0, movedItem);

            // 追蹤並修正目前所在站 (⭐) 的對應索引
            if (currentActiveIndex === oldIndex) {
                currentActiveIndex = newIndex;
            } else if (oldIndex < currentActiveIndex && newIndex >= currentActiveIndex) {
                currentActiveIndex--;
            } else if (oldIndex > currentActiveIndex && newIndex <= currentActiveIndex) {
                currentActiveIndex++;
            }

            renderStations();
            autoSync(); // 自動同步最新排序給跑馬燈
        }
    });
});
